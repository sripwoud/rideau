// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {YesNoFeedback} from "../src/YesNoFeedback.sol";
import {MockSemaphore} from "./MockSemaphore.sol";
import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";
import {BaseFeedback} from "../src/BaseFeedback.sol";

contract YesNoFeedbackTest is Test {
    YesNoFeedback public yesNoFeedback;
    MockSemaphore public mockSemaphore;

    function setUp() public {
        mockSemaphore = new MockSemaphore();
        yesNoFeedback = new YesNoFeedback(address(mockSemaphore));
    }

    function test_Constructor() public view {
        assertEq(address(yesNoFeedback.semaphore()), address(mockSemaphore));
        assertEq(yesNoFeedback.groupId(), 1);
        assertEq(mockSemaphore.membersCount(), 0);
    }

    function test_JoinGroup() public {
        uint256 idCommitment = 123456;
        yesNoFeedback.joinGroup(idCommitment);
        assertEq(mockSemaphore.membersCount(), 1);
    }

    function test_YesVote() public {
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 1; // Yes vote
        uint256[8] memory points;

        vm.expectEmit(true, true, true, true);
        emit ISemaphore.ProofValidated(
            yesNoFeedback.groupId(),
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            feedback,
            yesNoFeedback.groupId(),
            points
        );
        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_NoVote() public {
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 0; // No vote
        uint256[8] memory points;

        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_InvalidVote() public {
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 2; // Invalid vote
        uint256[8] memory points;

        vm.expectRevert(BaseFeedback.InvalidFeedback.selector);
        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }
}
