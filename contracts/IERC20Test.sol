// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

interface IERC20Test {
    function mint(address to, uint256 amount) external;

    function burnFrom(address account, uint256 amount) external;
}
