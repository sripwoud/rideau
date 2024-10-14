//SPDX-License-Identifier: MIT
pragma solidity >=0.8.7 <0.9.0;

import "./BaseFeedback.sol";

import "./BaseFeedback.sol";

contract FreeTextFeedback is BaseFeedback {
    constructor(address semaphoreAddress) BaseFeedback(semaphoreAddress) {}

    function isValidFeedback(uint256 feedbackHash) internal pure override returns (bool) {
        return feedbackHash != 0;
    }
}
