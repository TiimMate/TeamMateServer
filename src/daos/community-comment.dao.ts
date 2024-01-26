import db from "../models";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 2;

export const findCommunityComment = async (postId: number, cursorId: number | undefined) => {
    const commentsBeforeCursorForPost = { postId, ...generateCursorCondition(cursorId) };

    const comments = await db.CommunityComment.findAll({
        raw: true,
        where: commentsBeforeCursorForPost,
        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        include: [
            {
                model: db.User,
                attributes: ["nickname"],
            },
        ],
        attributes: ["id", "content", "createdAt"],
    });

    const ascendingComments = comments.sort((a, b) => a.id - b.id);
    return { ascendingComments, hasNext: calculateHasNext(ascendingComments, defaultLimit) };
};
