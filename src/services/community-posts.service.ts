import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import {
    getBookmark,
    // insertOrDeleteBookmark
} from "../daos/bookmark.dao";
import { findComment, insertComment } from "../daos/comment.dao";
// import { findCommunityComment, getCommentCount, insertCommunityComment } from "../daos/comment.dao";
// import { findCommunityImage } from "../daos/image.dao";
import {
    // findCommunityPost,
    // getCommunityPost,
    insertCommunityPost,
} from "../daos/community-post.dao";
import { getPost } from "../daos/post.dao";
// import { getPostByType } from "../daos/post.dao";
import {} from // readCommunityCommentsResonseDTO,
// readCommunityPostResponseDTO,
// readCommunityPostsResponseDTO,
"../dtos/community-posts.dto";
import { readCommentsResonseDTO } from "../dtos/posts.dto";
import { CreateCommunityCommentSchema } from "../schemas/community-comment.schema";
import { CreateCommunityPostSchema } from "../schemas/community-post.schema";
import { PostType } from "../types/post-type.enum";

// export const readCommunityPosts = async (userId: number | undefined, query) => {
//     const response = await findCommunityPost(userId, query.cursorId);
//     return readCommunityPostsResponseDTO(response);
// };

// export const createOrDeleteBookmark = async (userId, params) => {
//     await insertOrDeleteBookmark(userId, params.postId);
//     return;
// };

// export const readCommunityPost = async (userId, params) => {
//     const postId = params.postId;
//     const post = handlePostNotFound(await getCommunityPost(postId));
//     const imageUrls = await findCommunityImage(postId);
//     const commentCount = await getCommentCount(postId);
//     const comments = await findCommunityComment(postId, undefined);
//     const isBookmarked = await checkIsBookmarked(userId, postId);
//     return readCommunityPostResponseDTO(post, imageUrls, commentCount, comments, isBookmarked);
// };

// const checkIsBookmarked = async (userId: number | undefined, postId: number) => {
//     if (!userId) {
//         return null;
//     }
//     return Boolean(await getBookmark(userId, postId));
// };

export const readCommunityComments = async (params, query) => {
    const cursorId = query.cursorId;
    if (isNaN(Number(cursorId))) {
        throw new BaseError(status.REQUEST_VALIDATION_ERROR);
    }
    const comments = await findComment(params.postId, cursorId);
    return readCommentsResonseDTO(comments);
};

export const createCommunityPost = async (userId: number, body: CreateCommunityPostSchema) => {
    await insertCommunityPost(userId, body);
    return;
};

export const createCommunityComment = async (userId: number, params, body: CreateCommunityCommentSchema) => {
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
