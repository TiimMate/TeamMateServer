import db from "../models";
import { CreateUserReviewBody } from "../schemas/user-review.schema";

export const getExistingUserReview = async (userId: number, revieweeId: number, guestMatchId: number) => {
    return await db.UserReview.findOne({
        rew: true,
        where: {
            reviewerId: userId,
            revieweeId,
            guestMatchId,
        },
        attributes: ["id"],
    });
};

export const insertUserReview = async (userId: number, body: CreateUserReviewBody) => {
    await db.UserReview.create({
        reviewerId: userId,
        ...body,
    });
};

export const getTotalSkillScoreByUserId = async (userId: number) => {
    return await db.TeamReview.sum("skillScore", {
        where: {
            revieweeId: userId,
        },
    });
};

export const getTotalMannerScoreByUserId = async (userId: number) => {
    return await db.TeamReview.sum("mannerScore", {
        where: {
            revieweeId: userId,
        },
    });
};
