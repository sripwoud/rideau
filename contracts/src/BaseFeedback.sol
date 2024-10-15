// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";

abstract contract BaseFeedback {
    address public admin;
    uint256 public groupId;
    ISemaphore public semaphore;
    bool public terminated;

    error InvalidFeedback();
    error NotAdmin();
    error Terminated();

    constructor(address semaphoreAddress) {
        admin = msg.sender;
        terminated = false;
        semaphore = ISemaphore(semaphoreAddress);
        groupId = semaphore.createGroup(address(this));
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    modifier notTerminated() {
        if (terminated) revert Terminated();
        _;
    }

    modifier validateFeedback(uint256 feedback) {
        if (!isValidFeedback(feedback)) revert InvalidFeedback();
        _;
    }

    function terminate() external onlyAdmin {
        terminated = true;
    }

    function joinGroup(uint256 idCommitment) external notTerminated {
        semaphore.addMember(groupId, idCommitment);
    }

    function sendFeedback(
        uint256 merkleTreeDepth,
        uint256 merkleTreeRoot,
        uint256 nullifier,
        uint256 feedback,
        uint256[8] calldata points
    ) external notTerminated validateFeedback(feedback) {
        _validateProof(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function _validateProof(
        uint256 merkleTreeDepth,
        uint256 merkleTreeRoot,
        uint256 nullifier,
        uint256 feedback,
        uint256[8] calldata points
    ) internal {
        ISemaphore.SemaphoreProof memory proof =
            ISemaphore.SemaphoreProof(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, groupId, points);
        semaphore.validateProof(groupId, proof);
    }

    function isValidFeedback(uint256 feedback) internal virtual returns (bool);
}
