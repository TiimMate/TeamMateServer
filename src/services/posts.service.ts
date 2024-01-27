import { PostType } from "../constants/post-type.constant";
import { insertOrDeleteBookmark } from "../daos/bookmark.dao";
import { findPostByType, findPostByAuthorId, findBookmarkedPost } from "../daos/post.dao";
import { readPostsResponseDTO } from "../dtos/posts.dto";

export const readCommunityPosts = async (userId: number | undefined, query) => {
    const result = await findPostByType(userId, query.cursorId, PostType.Community);
    return readPostsResponseDTO(result);
};

export const readPostsByAuthor = async (userId: number, query) => {
    const result = await findPostByAuthorId(userId, query.cursorId);
    return readPostsResponseDTO(result);
};

export const readBookmarkedPosts = async (userId: number, query) => {
    const result = await findBookmarkedPost(userId, query.cursorId);
    return readPostsResponseDTO(result);
};

export const createOrDeleteBookmark = async (userId, params) => {
    await insertOrDeleteBookmark(userId, params.postId);
    return;
};
