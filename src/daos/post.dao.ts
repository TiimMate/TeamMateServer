import db from "../models";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

export const findPostByAuthorId = async (userId: number, cursorId?: number) => {
    const postsBeforeCursorForAuthor = { authorId: userId, ...generateCursorCondition(cursorId) };
    return findPost(userId, postsBeforeCursorForAuthor);
};

const findPost = async (userId: number | undefined, postFilter: object) => {
    const bookmarkInclude: any[] = [];
    if (userId) {
        bookmarkInclude.push({
            model: db.Bookmark,
            where: {
                userId,
            },
            required: false,
            attributes: ["id"],
        });
    }

    const posts = await db.Post.findAll({
        raw: true,
        where: postFilter,
        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        attributes: ["id", "title", "createdAt"],
        include: bookmarkInclude,
    });
    return { posts, hasNext: calculateHasNext(posts, defaultLimit) };
};
