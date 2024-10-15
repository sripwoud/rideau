// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity >=0.8.7 <0.9.0;

import {Test} from "forge-std/Test.sol";
import {YesNoFeedback} from "../src/YesNoFeedback.sol";
import {MockSemaphore} from "./MockSemaphore.sol";
import {ISemaphore} from "semaphore/interfaces/ISemaphore.sol";
import {BaseFeedback} from "../src/BaseFeedback.sol";

contract YesNoFeedbackTest is Test {
    YesNoFeedback private yesNoFeedback;
    MockSemaphore private mockSemaphore;
    uint256 private idCommitment = 123456;
    uint256 private merkleTreeDepth = 20;
    uint256 private merkleTreeRoot = 123;
    uint256 private nullifier = 456;
    uint256[8] private points;

    function setUp() public {
        mockSemaphore = new MockSemaphore();
        yesNoFeedback = new YesNoFeedback(address(mockSemaphore));
    }

    function test_Constructor() public view {
        assertEq(address(yesNoFeedback.semaphore()), address(mockSemaphore));
        assertEq(yesNoFeedback.groupId(), 1);
        assertEq(mockSemaphore.membersCount(), 0);
        assertEq(yesNoFeedback.terminated(), false);
        assertEq(yesNoFeedback.admin(), address(this));
    }

    function test_JoinGroup() public {
        yesNoFeedback.joinGroup(idCommitment);
        assertEq(mockSemaphore.membersCount(), 1);
    }

    function test_Terminate() public {
        yesNoFeedback.terminate();
        assertEq(yesNoFeedback.terminated(), true);
    }

    function test_RevertTerminateIfNotAdmin() public {
        vm.prank(address(0xdead));
        vm.expectRevert(BaseFeedback.NotAdmin.selector);
        yesNoFeedback.terminate();
    }

    function test_RevertJoinGroupIfTerminated() public {
        yesNoFeedback.terminate();
        vm.expectRevert(BaseFeedback.Terminated.selector);
        yesNoFeedback.joinGroup(idCommitment);
    }

    function test_RevertSendFeedbackIfTerminated() public {
        yesNoFeedback.terminate();
        uint256[8] memory points;

        vm.expectRevert(BaseFeedback.Terminated.selector);
        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, 1, points);
    }

    function test_YesVote() public {
        uint256 feedback = 1;

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
        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, 0, points);
    }

    function test_InvalidVote() public {
        vm.expectRevert(BaseFeedback.InvalidFeedback.selector);
        yesNoFeedback.sendFeedback(merkleTreeDepth, merkleTreeRoot, nullifier, 2, points);
    }
}
