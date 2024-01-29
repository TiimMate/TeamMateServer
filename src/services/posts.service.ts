import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getBookmark, insertOrDeleteBookmark } from "../daos/bookmark.dao";
import { findComment, getCommentCount, insertComment } from "../daos/comment.dao";
import { findImage } from "../daos/image.dao";
import { findPostByType, findPostByAuthorId, findBookmarkedPost, getPost, insertPost } from "../daos/post.dao";
import { readCommentsResonseDTO, readPostResponseDTO, readPostsResponseDTO } from "../dtos/posts.dto";
import { CreateCommentSchema } from "../schemas/comment.schema";
import { CreatePostSchema } from "../schemas/post.schema";
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

export const createCommunityPost = async (userId: number, body: CreatePostSchema) => {
    await insertPost(userId, body, PostType.Community);
    return;
};

export const createComment = async (userId: number, params, body: CreateCommentSchema) => {
    const postId = params.postId;
    handlePostNotFound(await getPost(postId));
    await insertComment(userId, postId, body);
    return;
};

const handlePostNotFound = (post) => {
    if (!post) {
        throw new BaseError(status.POST_NOT_FOUND);
    }
    return post;
};

export const readComments = async (params, query) => {
    const cursorId = query.cursorId;
    if (isNaN(Number(cursorId))) {
        throw new BaseError(status.REQUEST_VALIDATION_ERROR);
    }
    const comments = await findComment(params.postId, cursorId);
    return readCommentsResonseDTO(comments);
};