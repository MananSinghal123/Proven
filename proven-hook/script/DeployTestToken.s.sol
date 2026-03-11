// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {TestToken} from "../src/TestToken.sol";

/// @notice Deploys a TestToken on Unichain Sepolia for E2E testing.
contract DeployTestToken is Script {
    function run() public {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);

        console.log("Deployer:", deployer);

        vm.startBroadcast(pk);

        TestToken token = new TestToken("Proven Test Token", "PTT");
        console.log("TestToken deployed at:", address(token));
        console.log("Symbol: PTT");
        console.log("Supply: 1,000,000 PTT (to deployer)");

        vm.stopBroadcast();
    }
}
