// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";

contract MockSemaphore is ISemaphore {
    uint256 public groupCounter;
    uint256 public membersCount;

    function createGroup() external returns (uint256) {}

    function createGroup(address) external returns (uint256) {
        return ++groupCounter;
    }

    function createGroup(address admin, uint256 merkleTreeDuration) external returns (uint256) {}

    function updateGroupAdmin(uint256 groupId, address newAdmin) external {}

    function acceptGroupAdmin(uint256 groupId) external {}

    function updateGroupMerkleTreeDuration(uint256 groupId, uint256 newMerkleTreeDuration) external {}

    function addMember(uint256, uint256) external {
        membersCount++;
    }

    function addMembers(uint256 groupId, uint256[] calldata identityCommitments) external {}

    function updateMember(
        uint256 groupId,
        uint256 oldIdentityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external {}

    function removeMember(uint256 groupId, uint256 identityCommitment, uint256[] calldata merkleProofSiblings)
        external
    {}

    function validateProof(uint256 groupId, SemaphoreProof calldata proof) external {
        emit ISemaphore.ProofValidated(
            groupId,
            proof.merkleTreeDepth,
            proof.merkleTreeRoot,
            proof.nullifier,
            proof.message,
            proof.scope,
            proof.points
        );
    }

    function verifyProof(uint256 groupId, SemaphoreProof calldata proof) external view returns (bool) {}
}
