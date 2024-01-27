import { PostType } from "../constants/post-type.constant";
import db from "../models";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

export const findPostByType = async (userId: number | undefined, cursorId: number | undefined, type: PostType) => {
    const communityPostsBeforeCursor = { type, ...generateCursorCondition(cursorId) };
    return findPostByFilter(userId, communityPostsBeforeCursor);
};

export const findPostByAuthorId = async (userId: number, cursorId?: number) => {
    const postsBeforeCursorForAuthor = { authorId: userId, ...generateCursorCondition(cursorId) };
    return findPostByFilter(userId, postsBeforeCursorForAuthor);
};

const findPostByFilter = async (userId: number | undefined, postFilter: object) => {
    const includeAllPosts: any[] = [];
    if (userId) {
        includeAllPosts.push({
            model: db.Bookmark,
            where: {
                userId,
            },
            required: false,
            attributes: ["id"],
        });
    }
    return findPost(postFilter, includeAllPosts);
};

export const findBookmarkedPost = async (userId: number, cursorId?: number) => {
    const postsBeforeCursor = generateCursorCondition(cursorId);
    const includeBookmarkedPosts = [
        {
            model: db.Bookmark,
            where: {
                userId,
            },
            attributes: ["id"],
        },
    ];
    return findPost(postsBeforeCursor, includeBookmarkedPosts);
};

const findPost = async (postFilter: object, bookmarkInclude: Array<any>) => {
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
