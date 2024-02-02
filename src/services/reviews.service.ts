import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { CreateTeamReviewBody } from "../schemas/team-review.schema";
import { getGame } from "../daos/games.dao";
import { findLeaderId } from "../daos/team.dao";
import { getGuestingByAcceptedUserId } from "../daos/guest.dao";
import { getExistingTeamReview, insertTeamReview } from "../daos/team-review.dao";

export const createTeamReview = async (userId: number, body: CreateTeamReviewBody) => {
    const { teamMatchId, guestMatchId } = body;
    if (!(teamMatchId || guestMatchId) || (teamMatchId && guestMatchId)) {
        throw new BaseError(status.MATCH_ID_REQUIRED);
    }

    const result = await retrieveReviewedTeamIdAndGameTime(userId, teamMatchId, guestMatchId);

    //validate user write permission
    if (!result?.reviewedTeamId) {
        throw new BaseError(status.NO_REVIEW_TARGET);
    }
    const currentTime = getCurrentTime();
    console.log(result.gameTime, currentTime);
    if (result.gameTime > currentTime) {
        throw new BaseError(status.REVIEW_NOT_CURRENTLY_WRITABLE);
    }
    const review = await getExistingTeamReview(userId, result.reviewedTeamId, teamMatchId, guestMatchId);
    if (review) {
        throw new BaseError(status.REVIEW_ALREADY_WRITTEN);
    }

    await insertTeamReview(userId, result.reviewedTeamId, body);
    return;
};

const retrieveReviewedTeamIdAndGameTime = async (userId: number, teamMatchId?: number, guestMatchId?: number) => {
    if (teamMatchId) {
        const teamMatch = await getGame(teamMatchId);
        const teams = await findLeaderId(teamMatch.hostTeamId, teamMatch.opposingTeamId);
        for (const team of teams) {
            if (team.leaderId == userId) {
                return { reviewedTeamId: team.id, gameTime: teamMatch.gameTime };
            }
        }
    }
    if (guestMatchId) {
        const guestMatch = await getGuestingByAcceptedUserId(guestMatchId, userId);
        return { reviewedTeamId: guestMatch?.teamId, gameTime: guestMatch?.gameTime };
    }
};

const getCurrentTime = (): Date => {
    return new Date();
};
