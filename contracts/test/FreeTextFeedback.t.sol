// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {FreeTextFeedback} from "../src/FreeTextFeedback.sol";
import {MockSemaphore} from "./MockSemaphore.sol";
import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";
import {BaseFeedback} from "../src/BaseFeedback.sol";

contract FreeTextFeedbackTest is Test {
    FreeTextFeedback private freeTextFeedback;
    MockSemaphore private mockSemaphore;
    uint256 private idCommitment = 123456;
    uint256 private merkleTreeDepth = 20;
    uint256 private merkleTreeRoot = 123;
    uint256 private nullifier = 456;
    uint256 private feedbackHash = uint256(keccak256(abi.encodePacked("This is a valid feedback")));
    uint256[8] private points;
    string title = "Free Text Feedback";

    function setUp() public {
        mockSemaphore = new MockSemaphore();
        freeTextFeedback = new FreeTextFeedback(address(mockSemaphore), title);
    }

    function test_Constructor() public {
        assertEq(address(freeTextFeedback.semaphore()), address(mockSemaphore));
        assertEq(freeTextFeedback.groupId(), 1);
        assertEq(mockSemaphore.groupCounter(), 1);
    }

    function test_Terminate() public {
        freeTextFeedback.terminate();
        assertEq(freeTextFeedback.terminated(), true);
    }

    function test_RevertTerminateIfNotAdmin() public {
        vm.prank(address(0xdead));
        vm.expectRevert(BaseFeedback.NotAdmin.selector);
        freeTextFeedback.terminate();
    }

    function test_RevertJoinGroupIfTerminated() public {
        freeTextFeedback.terminate();
        vm.expectRevert(BaseFeedback.Terminated.selector);
        freeTextFeedback.joinGroup(idCommitment);
    }

    function test_RevertSendFeedbackIfTerminated() public {
        freeTextFeedback.terminate();
        vm.expectRevert(BaseFeedback.Terminated.selector);
        freeTextFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedbackHash, points);
    }

    function test_JoinGroup() public {
        freeTextFeedback.joinGroup(idCommitment);
        assertEq(mockSemaphore.membersCount(), 1);
    }

    function test_ValidFeedback() public {
        vm.expectEmit(true, true, true, true);
        emit ISemaphore.ProofValidated(
            freeTextFeedback.groupId(),
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            feedbackHash,
            freeTextFeedback.groupId(),
            points
        );
        freeTextFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedbackHash, points);
    }

    function test_RevertIfInvalidFeedback() public {
        vm.expectRevert(BaseFeedback.InvalidFeedback.selector);
        freeTextFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, 0, points);
    }
}
