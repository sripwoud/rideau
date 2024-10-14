//SPDX-License-Identifier: MIT
pragma solidity >=0.8.7 <0.9.0;

import "./BaseFeedback.sol";

contract MultipleChoiceFeedback is BaseFeedback {
    string[] public options;

    error InsufficientOptions(uint256 providedOptions);

    constructor(address semaphoreAddress, string[] memory _options) BaseFeedback(semaphoreAddress) {
        if (_options.length < 2) {
            revert InsufficientOptions(_options.length);
        }
        options = _options;
    }

    function isValidFeedback(uint256 feedback) internal view override returns (bool) {
        return feedback < options.length;
    }
}
