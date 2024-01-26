import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getCommunityBookmark, insertOrDeleteBookmark } from "../daos/community-bookmark.dao";
import { findCommunityComment } from "../daos/community-comment.dao";
import { findCommunityImage } from "../daos/community-image.dao";
import { findCommunityPost, getCommunityPost } from "../daos/community-post.dao";
import { readCommunityPostResponseDTO, readCommunityPostsResponseDTO } from "../dtos/community-posts.dto";

export const readCommunityPosts = async (userId: number | undefined, query) => {
    const response = await findCommunityPost(userId, query.cursorId);
    return readCommunityPostsResponseDTO(response);
};

export const createOrDeleteBookmark = async (userId, params) => {
    await insertOrDeleteBookmark(userId, params.postId);
    return;
};

export const readCommunityPost = async (userId, params) => {
    const postId = params.postId;
    const post = await getCommunityPost(userId, postId);
    if (!post) {
        throw new BaseError(status.POST_NOT_FOUND);
    }
    const imageUrls = await findCommunityImage(postId);
    const comments = await findCommunityComment(postId, undefined);
    const isBookmarked = await checkIsBookmarked(userId, postId);
    return readCommunityPostResponseDTO(post, imageUrls, comments, isBookmarked);
};

const checkIsBookmarked = async (userId: number | undefined, postId: number) => {
    if (!userId) {
        return null;
    }
    return Boolean(await getCommunityBookmark(userId, postId));
};
