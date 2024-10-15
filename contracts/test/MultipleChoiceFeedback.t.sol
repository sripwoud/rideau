// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {MultipleChoiceFeedback} from "../src/MultipleChoiceFeedback.sol";
import {MockSemaphore} from "./MockSemaphore.sol";
import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";
import {BaseFeedback} from "../src/BaseFeedback.sol";

contract MultipleChoiceFeedbackTest is Test {
    MultipleChoiceFeedback public multipleChoiceFeedback;
    MockSemaphore public mockSemaphore;
    string[] public testOptions;

    function setUp() public {
        mockSemaphore = new MockSemaphore();
        testOptions = ["Option A", "Option B", "Option C"];
        multipleChoiceFeedback = new MultipleChoiceFeedback(address(mockSemaphore), testOptions);
    }

    function test_Constructor() public view {
        assertEq(address(multipleChoiceFeedback.semaphore()), address(mockSemaphore));
        assertEq(multipleChoiceFeedback.groupId(), 1);
        assertEq(mockSemaphore.groupCounter(), 1);
        assertEq(multipleChoiceFeedback.options(0), "Option A");
        assertEq(multipleChoiceFeedback.options(1), "Option B");
        assertEq(multipleChoiceFeedback.options(2), "Option C");
    }

    function test_RevertConstructorIfInsufficientOptions() public {
        string[] memory insufficientOptions = new string[](1);
        insufficientOptions[0] = "Only Option";

        vm.expectRevert(MultipleChoiceFeedback.InsufficientOptions.selector);
        new MultipleChoiceFeedback(address(mockSemaphore), insufficientOptions);
    }

    function test_JoinGroup() public {
        uint256 idCommitment = 123456;
        multipleChoiceFeedback.joinGroup(idCommitment);
        assertEq(mockSemaphore.membersCount(), 1);
    }

    function test_ValidFeedback() public {
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 1; // Valid feedback (index 1)
        uint256[8] memory points;

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
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 3; // Invalid feedback (out of range)
        uint256[8] memory points;

        vm.expectRevert(BaseFeedback.InvalidFeedback.selector);
        multipleChoiceFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, feedback, points);
    }

    function test_FeedbackAtUpperBound() public {
        uint256 merkleTreeDepth = 20;
        uint256 merkleTreeRoot = 123;
        uint256 nullifier = 456;
        uint256 feedback = 2; // Valid feedback (last index)
        uint256[8] memory points;

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
