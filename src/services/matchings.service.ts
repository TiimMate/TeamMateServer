import { findGameByHostTeamsAndGameTime, findGameByOpposingTeamsAndGameTime } from "../daos/game.dao";
import { getApplyGuestingUser, getGuestingUser } from "../daos/guest-user.dao";
import { findGuestingByTeamsAndGameTime, findGuestingByUserAndGameTime } from "../daos/guest.dao";
import { getTeamsAppliedById } from "../daos/matching.dao";
import { getMemberCountByTeamId, addMemberCount } from "../daos/member.dao";
import { getExistingTeamReview } from "../daos/team-review.dao";
import { findTeamIdByLeaderId } from "../daos/team.dao";
import { getExistingUserReview } from "../daos/user-review.dao";
import {
    readApplyGuestingUserResponseDTO,
    readGuestingUserResponseDTO,
    readHostingApplicantsTeamResponseDTO,
    readMatchingResponseDTO,
} from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const gameTime = query.date;
    const matchingGuestings = await findGuestingByUserAndGameTime(userId, query.date);
    for (const matchingGuesting of matchingGuestings) {
        const guestReviewId = await getExistingTeamReview(
            userId,
            matchingGuesting["Team.id"],
            undefined,
            matchingGuesting.id,
        );
        if (new Date() < new Date(matchingGuesting.gameTime)) {
            matchingGuesting.reviewStatus = "PENDING";
        } else if (!guestReviewId) {
            matchingGuesting.reviewStatus = "UNCOMPLETED";
        } else {
            matchingGuesting.reviewStatus = "COMPLETED";
        }
    }

    const teamIds = await findTeamIdByLeaderId(userId);
    const matchingGames = await findGameByOpposingTeamsAndGameTime(teamIds, gameTime);
    for (const matchingGame of matchingGames) {
        const gameReviewId = await getExistingTeamReview(
            userId,
            matchingGame["HostTeam.id"],
            matchingGame.id,
            undefined,
        );
        if (new Date() < new Date(matchingGame.gameTime)) {
            matchingGame.reviewStatus = "PENDING";
        } else if (!gameReviewId) {
            matchingGame.reviewStatus = "UNCOMPLETED";
        } else {
            matchingGame.reviewStatus = "COMPLETED";
        }
    }

    await addMemberCount(matchingGuestings);
    await addMemberCount(matchingGames);
    return readMatchingResponseDTO(matchingGuestings, matchingGames);
};

export const readMatchingHosting = async (userId: number, query) => {
    const gameTime = query.date;
    const teamIds = await findTeamIdByLeaderId(userId);
    const matchingGuestings = await findGuestingByTeamsAndGameTime(teamIds, gameTime);
    const matchingGames = await findGameByHostTeamsAndGameTime(teamIds, gameTime);
    for (const matchingGame of matchingGames) {
        const gameReviewId = await getExistingTeamReview(
            userId,
            matchingGame.opposingTeamId,
            matchingGame.id,
            undefined,
        );
        if (new Date() < new Date(matchingGame.gameTime)) {
            matchingGame.reviewStatus = "PENDING";
        } else if (!gameReviewId) {
            matchingGame.reviewStatus = "UNCOMPLETED";
        } else {
            matchingGame.reviewStatus = "COMPLETED";
        }
    }

    await addMemberCount(matchingGuestings);
    await addMemberCount(matchingGames);
    return readMatchingResponseDTO(matchingGuestings, matchingGames);
};

export const readMatchingHostingGuestUser = async (userId: number, params) => {
    const guestingId = params.guestingId;
    const guestUsers = await getGuestingUser(guestingId);
    for (const guestUser of guestUsers) {
        const guestReviewId = await getExistingUserReview(userId, guestUser.userId, guestingId);
        if (new Date() < new Date(guestUser["guest.gameTime"])) {
            guestUser.reviewStatus = "PENDING";
        } else if (!guestReviewId) {
            guestUser.reviewStatus = "UNCOMPLETED";
        } else {
            guestUser.reviewStatus = "COMPLETED";
        }
    }
    return readGuestingUserResponseDTO(guestUsers);
};

export const readApplyGuestingUser = async (params) => {
    const guestingId = params.guestingId;
    const applyGuestingUser = await getApplyGuestingUser(guestingId);
    return readApplyGuestingUserResponseDTO(applyGuestingUser);
};

export const readHostingApplicantsTeamList = async (userId, params) => {
    const gameId = params.gameId;
    const teamsApplied = await getTeamsAppliedById(gameId);
    for (const team of teamsApplied) {
        team.memberCount = await getMemberCountByTeamId(team);
    }

    return readHostingApplicantsTeamResponseDTO(teamsApplied);
};
