//SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity >=0.8.7 <0.9.0;

import "./BaseFeedback.sol";

contract MultipleChoiceFeedback is BaseFeedback {
    string[] public options;

    error InsufficientOptions();

    constructor(address semaphoreAddress, string[] memory _options, string memory title)
        BaseFeedback(semaphoreAddress, title)
    {
        if (_options.length < 2) {
            revert InsufficientOptions();
        }
        options = _options;
    }

    function isValidFeedback(uint256 feedback) internal view override returns (bool) {
        return feedback < options.length;
    }
}
