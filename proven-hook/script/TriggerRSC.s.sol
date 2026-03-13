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
    address constant PRVN  = 0x3c2d1A5c84B7F513ed07Fe2e71dF9538aC217F7c;
    address constant HOOK  = 0xC7bFe6835bC6a4d9A32f0F34A75C21A0982D8640;
    address constant SWAP_ROUTER = 0x9140a78c1A137c7fF1c151EC8231272aF78a99A4;

    // New wallet to register position from
    address constant NEW_WALLET = 0x64BFbA32D016AB89956a15b442E6ee3C049c040a;
    uint256 constant NEW_WALLET_PK = 0x714f84b42e2eb4b5ecf44fd221069ab125c6cea241f7cf6b0d5bd0bd22e22d81;

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

        // Token funding is optional for registration; skipped to keep this debug path deterministic.
        console.log("Skipped token funding; registration does not require token balances");

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

        bytes memory hookData = abi.encode(msg.sender);

        // Do 3 swaps to generate enough signal
        for (uint256 i = 0; i < 3; i++) {
            IPoolSwapTest(SWAP_ROUTER).swap(key, params, settings, hookData);
        }
        console.log("=== 3 swaps executed, PoolMetricsUpdated events emitted ===");

        vm.stopBroadcast();
    }

    /// @notice Registration-only path (assumes NEW_WALLET already has gas)
    function phase1_registerOnly() public {
        PoolKey memory key = getPoolKey();
        PoolId poolId = key.toId();

        vm.startBroadcast(NEW_WALLET_PK);

        Milestone[3] memory milestones;
        milestones[0] = Milestone({conditionType: 0, threshold: 500e18,  unlockPct: 30, complete: false});
        milestones[1] = Milestone({conditionType: 1, threshold: 1000e18, unlockPct: 40, complete: false});
        milestones[2] = Milestone({conditionType: 2, threshold: 3,       unlockPct: 30, complete: false});

        IVestingHook(HOOK).registerVestingPosition(milestones, PRVN, poolId);
        console.log("=== PositionRegistered emitted from NEW_WALLET ===");

        vm.stopBroadcast();
    }

    function run() public {
        phase1_register();
    }
}
