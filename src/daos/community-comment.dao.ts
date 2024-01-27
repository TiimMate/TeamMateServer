import db from "../models";
import { CreateCommunityCommentSchema } from "../schemas/community-comment.schema";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

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

export const getCommentCount = async (postId: number) => {
    return await db.CommunityComment.count({
        where: {
            postId,
        },
    });
};

export const insertCommunityComment = async (userId: number, postId: number, body: CreateCommunityCommentSchema) => {
    await db.CommunityComment.create({
        postId,
        authorId: userId,
        content: body.content,
    });
};
