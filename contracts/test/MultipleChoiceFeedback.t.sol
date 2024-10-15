// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {MultipleChoiceFeedback} from "../src/MultipleChoiceFeedback.sol";
import {MockSemaphore} from "./MockSemaphore.sol";
import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";
import {BaseFeedback} from "../src/BaseFeedback.sol";

contract MultipleChoiceFeedbackTest is Test {
    MultipleChoiceFeedback private multipleChoiceFeedback;
    MockSemaphore private mockSemaphore;
    uint256 private idCommitment = 123456;
    uint256 private merkleTreeDepth = 20;
    uint256 private merkleTreeRoot = 123;
    uint256 private nullifier = 456;
    uint256[8] private points;
    string[] private testOptions;
    string title = "Multiple Choice Feedback";

    function setUp() public {
        mockSemaphore = new MockSemaphore();
        testOptions = ["Option A", "Option B", "Option C"];
        multipleChoiceFeedback = new MultipleChoiceFeedback(address(mockSemaphore), testOptions, title);
    }

    function test_Constructor() public view {
        assertEq(address(multipleChoiceFeedback.semaphore()), address(mockSemaphore));
        assertEq(multipleChoiceFeedback.groupId(), 1);
        assertEq(mockSemaphore.groupCounter(), 1);
        assertEq(multipleChoiceFeedback.terminated(), false);
        assertEq(multipleChoiceFeedback.admin(), address(this));
        assertEq(multipleChoiceFeedback.options(0), "Option A");
        assertEq(multipleChoiceFeedback.options(1), "Option B");
        assertEq(multipleChoiceFeedback.options(2), "Option C");
    }

    function test_Terminate() public {
        multipleChoiceFeedback.terminate();
        assertEq(multipleChoiceFeedback.terminated(), true);
    }

    function test_RevertTerminateIfNotAdmin() public {
        vm.prank(address(0xdead));
        vm.expectRevert(BaseFeedback.NotAdmin.selector);
        multipleChoiceFeedback.terminate();
    }

    function test_RevertJoinGroupIfTerminated() public {
        multipleChoiceFeedback.terminate();
        vm.expectRevert(BaseFeedback.Terminated.selector);
        multipleChoiceFeedback.joinGroup(idCommitment);
    }

    function test_RevertSendFeedbackIfTerminated() public {
        multipleChoiceFeedback.terminate();
        uint256 feedback = 1; // Option A

        vm.expectRevert(BaseFeedback.Terminated.selector);
        multipleChoiceFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_RevertConstructorIfInsufficientOptions() public {
        string[] memory insufficientOptions = new string[](1);
        insufficientOptions[0] = "Only Option";

        vm.expectRevert(MultipleChoiceFeedback.InsufficientOptions.selector);
        new MultipleChoiceFeedback(address(mockSemaphore), insufficientOptions, title);
    }

    function test_JoinGroup() public {
        multipleChoiceFeedback.joinGroup(idCommitment);
        assertEq(mockSemaphore.membersCount(), 1);
    }

    function test_ValidFeedback() public {
        uint256 feedback = 1; // Valid feedback (index 1)

        vm.expectEmit(true, true, true, true);
        emit ISemaphore.ProofValidated(
            multipleChoiceFeedback.groupId(),
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            feedback,
            multipleChoiceFeedback.groupId(),
            points
        );
        multipleChoiceFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_RevertIfOutOfRangeFeedbackOption() public {
        uint256 feedback = 3; // Invalid feedback (out of range)

        vm.expectRevert(BaseFeedback.InvalidFeedback.selector);
        multipleChoiceFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_FeedbackAtUpperBound() public {
        uint256 feedback = 2; // Valid feedback (last index)

        vm.expectEmit(true, true, true, true);
        emit ISemaphore.ProofValidated(
            multipleChoiceFeedback.groupId(),
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            feedback,
            multipleChoiceFeedback.groupId(),
            points
        );
        multipleChoiceFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }
}
