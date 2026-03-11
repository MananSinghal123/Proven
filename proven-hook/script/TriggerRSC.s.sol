// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface IVestingHook {
    function registerVestingPosition(
        Milestone[3] calldata milestones,
        address tokenAddr,
        PoolId poolId
    ) external;
}

struct Milestone {
    uint8 conditionType;  // 0=TVL, 1=Vol, 2=Users
    uint256 threshold;
    uint8 unlockPct;
    bool complete;
}

interface IPoolSwapTest {
    struct TestSettings {
        bool takeClaims;
        bool settleUsingBurn;
    }

    function swap(
        PoolKey calldata key,
        IPoolSwapTest.SwapParams calldata params,
        TestSettings calldata testSettings,
        bytes calldata hookData
    ) external payable returns (int256);

    struct SwapParams {
        bool zeroForOne;
        int256 amountSpecified;
        uint160 sqrtPriceLimitX96;
    }
}

/**
 * @title TriggerRSC
 * @notice Two-phase script to trigger RSC:
 *   Phase 1: Fund new wallet + register position (run with deployer key)
 *   Phase 2: Do a swap to trigger PoolMetricsUpdated (run with deployer key)
 */
contract TriggerRSC is Script {
    using PoolIdLibrary for PoolKey;

    // Deployed addresses on Unichain Sepolia
    address constant USDC  = 0x11aFfEac94B440C3c332813450db66fb3285BFB2;
    address constant PRVN  = 0x9af9C6fe2a845354EcC3bDCe1af9c427Fb42Ed70;
    address constant HOOK  = 0x93786437631FB0716C77A76ceE94Cd45E27b0640;
    address constant SWAP_ROUTER = 0x9140a78c1A137c7fF1c151EC8231272aF78a99A4;

    // New wallet to register position from
    address constant NEW_WALLET = 0x855c79A8992c0AB5Ce7701B18868c00797725769;
    uint256 constant NEW_WALLET_PK = 0x9b2d1b1d314a1cdbcf2608ba7fcf372ea6e3e3d6901aa1470872ad0082bd1980;

    function getPoolKey() internal pure returns (PoolKey memory) {
        return PoolKey({
            currency0: Currency.wrap(USDC),
            currency1: Currency.wrap(PRVN),
            fee: 3000,
            tickSpacing: int24(60),
            hooks: IHooks(HOOK)
        });
    }

    /// @notice Phase 1: Fund new wallet and register a new vesting position
    function phase1_register() public {
        PoolKey memory key = getPoolKey();
        PoolId poolId = key.toId();

        // Step 1: Deployer funds the new wallet
        vm.startBroadcast();

        // Send ETH for gas
        payable(NEW_WALLET).transfer(0.01 ether);
        console.log("Sent 0.01 ETH to new wallet");

        // Send tokens for the position (not needed for registration, but good to have)
        IERC20(USDC).transfer(NEW_WALLET, 100e18);
        IERC20(PRVN).transfer(NEW_WALLET, 100e18);
        console.log("Sent 100 USDC + 100 PRVN to new wallet");

        vm.stopBroadcast();

        // Step 2: New wallet registers a vesting position
        vm.startBroadcast(NEW_WALLET_PK);

        Milestone[3] memory milestones;
        milestones[0] = Milestone({conditionType: 0, threshold: 500e18,  unlockPct: 30, complete: false}); // TVL > 500
        milestones[1] = Milestone({conditionType: 1, threshold: 1000e18, unlockPct: 40, complete: false}); // Vol > 1000
        milestones[2] = Milestone({conditionType: 2, threshold: 3,       unlockPct: 30, complete: false}); // Users > 3

        IVestingHook(HOOK).registerVestingPosition(milestones, PRVN, poolId);
        console.log("=== PositionRegistered emitted! RSC should pick this up ===");

        vm.stopBroadcast();
    }

    /// @notice Phase 2: Do swaps to trigger PoolMetricsUpdated events
    function phase2_swap() public {
        PoolKey memory key = getPoolKey();

        vm.startBroadcast();

        IERC20(USDC).approve(SWAP_ROUTER, type(uint256).max);
        IERC20(PRVN).approve(SWAP_ROUTER, type(uint256).max);

        IPoolSwapTest.SwapParams memory params = IPoolSwapTest.SwapParams({
            zeroForOne: true,
            amountSpecified: -10e18,
            sqrtPriceLimitX96: 4295128740
        });

        IPoolSwapTest.TestSettings memory settings = IPoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        // Do 3 swaps to generate enough signal
        for (uint256 i = 0; i < 3; i++) {
            IPoolSwapTest(SWAP_ROUTER).swap(key, params, settings, "");
        }
        console.log("=== 3 swaps executed, PoolMetricsUpdated events emitted ===");

        vm.stopBroadcast();
    }

    function run() public {
        phase1_register();
    }
}
