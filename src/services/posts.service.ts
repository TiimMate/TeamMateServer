import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { PostType } from "../types/post-type.enum";
import { CreateCommentBody } from "../schemas/comment.schema";
import { CreatePostBody, UpdatePostBody } from "../schemas/post.schema";
import { getBookmark, insertOrDeleteBookmark } from "../daos/bookmark.dao";
import { findComment, getCommentCount, insertComment } from "../daos/comment.dao";
import { findImage } from "../daos/image.dao";
import {
    findPostByType,
    findPostByAuthorId,
    findBookmarkedPost,
    getPost,
    insertPost,
    getPostByAuthorId,
    setPost,
} from "../daos/post.dao";
import {
    readCommentsResonseDTO,
    readPostResponseDTO,
    readPostsResponseDTO,
    readRentPostsResponseDTO,
} from "../dtos/posts.dto";

export const readCommunityPosts = async (userId: number | undefined, query) => {
    const result = await findPostByType(userId, query.date, query.cursorId, PostType.Community);
    return readPostsResponseDTO(result);
};

export const readMyCommunityPosts = async (userId: number, query) => {
    const result = await findPostByAuthorId(userId, PostType.Community, query.cursorId);
    return readPostsResponseDTO(result);
};

export const readMyRentPosts = async (userId: number, query) => {
    const result = await findPostByAuthorId(userId, PostType.RentalInfo, query.cursorId);
    return readPostsResponseDTO(result);
};

export const readBookmarkedPosts = async (userId: number, query) => {
    const result = await findBookmarkedPost(userId, query.cursorId);
    return readPostsResponseDTO(result);
};

export const createOrDeleteBookmark = async (userId: number, params) => {
    await insertOrDeleteBookmark(userId, params.postId);
    return;
};

export const readPost = async (userId: number, params) => {
    const postId = params.postId;
    const post = handlePostNotFound(await getPost(postId));
    const commentCount = await getCommentCount(postId);
    const comments = await findComment(postId, undefined);
    const isBookmarked = await checkIsBookmarked(userId, postId);
    return readPostResponseDTO(post, commentCount, comments, isBookmarked);
};

const checkIsBookmarked = async (userId: number | undefined, postId: number) => {
    if (!userId) {
        return null;
    }
    return Boolean(await getBookmark(userId, postId));
};

export const createCommunityPost = async (userId: number, body: CreatePostBody) => {
    await insertPost(userId, body, PostType.Community);
    return;
};

export const createComment = async (userId: number, params, body: CreateCommentBody) => {
    const postId: number = params.postId;
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

export const createRentPost = async (userId: number, body: CreatePostBody) => {
    await insertPost(userId, body, PostType.RentalInfo);
    return;
};

export const updateRentPost = async (userId: number, body: UpdatePostBody, params) => {
    const postId = params.postId;
    const post = handlePostUserWroteNotFound(await getPostByAuthorId(postId, userId));
    console.log(post);
    console.log(body);

    await setPost(post, body);
    return;
};

const handlePostUserWroteNotFound = (post) => {
    if (!post) {
        throw new BaseError(status.POST_USER_WROTE_NOT_FOUND);
    }
    return post;
};

export const readRentPosts = async (userId: number | undefined, query) => {
    const result = await findPostByType(userId, query.date, query.cursorId, PostType.RentalInfo);
    return readRentPostsResponseDTO(result);
};
