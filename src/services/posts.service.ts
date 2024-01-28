import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getBookmark, insertOrDeleteBookmark } from "../daos/bookmark.dao";
import { findComment, getCommentCount } from "../daos/comment.dao";
import { findImage } from "../daos/image.dao";
import { findPostByType, findPostByAuthorId, findBookmarkedPost, getPost } from "../daos/post.dao";
import { readPostResponseDTO, readPostsResponseDTO } from "../dtos/posts.dto";
import { PostType } from "../types/post-type.enum";

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

export const readPost = async (userId, params) => {
    const postId = params.postId;
    const post = handlePostNotFound(await getPost(postId));
    const imageUrls = await findImage(postId);
    const commentCount = await getCommentCount(postId);
    const comments = await findComment(postId, undefined);
    const isBookmarked = await checkIsBookmarked(userId, postId);
    return readPostResponseDTO(post, imageUrls, commentCount, comments, isBookmarked);
};

const checkIsBookmarked = async (userId: number | undefined, postId: number) => {
    if (!userId) {
        return null;
    }
    return Boolean(await getBookmark(userId, postId));
};

const handlePostNotFound = (post) => {
    if (!post) {
        throw new BaseError(status.POST_NOT_FOUND);
    }
    return post;
};
