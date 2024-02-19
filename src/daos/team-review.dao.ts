import db from "../models";
import { CreateTeamReviewBody } from "../schemas/team-review.schema";

export const getExistingTeamReview = async (
    userId: number,
    reviewedTeamId: number,
    teamMatchId?: number,
    guestMatchId?: number,
) => {
    return await db.TeamReview.findOne({
        raw: true,
        where: {
            reviewerId: userId,
            reviewedTeamId,
            teamMatchId: teamMatchId ?? null,
            guestMatchId: guestMatchId ?? null,
        },
        attributes: ["id"],
    });
};

export const insertTeamReview = async (userId: number, reviewedTeamId: number, body: CreateTeamReviewBody) => {
    await db.TeamReview.create({
        reviewerId: userId,
        reviewedTeamId,
        ...body,
    });
};

export const getTotalSkillScoreByTeamId = async (teamId: number) => {
    return await db.TeamReview.sum("skillScore", {
        where: {
            reviewedTeamId: teamId,
        },
    });
};

export const getTotalMannerScoreByTeamId = async (teamId: number) => {
    return await db.TeamReview.sum("mannerScore", {
        where: {
            reviewedTeamId: teamId,
        },
    });
};
