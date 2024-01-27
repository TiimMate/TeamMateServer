import { PostType } from "../constants/post-type.constant";
import { findPostByType, findPostByAuthorId } from "../daos/post.dao";
import { readPostsResponseDTO } from "../dtos/posts.dto";

export const readCommunityPosts = async (userId: number | undefined, query) => {
    const result = await findPostByType(userId, query.cursorId, PostType.Community);
    return readPostsResponseDTO(result);
};

export const readPostsByAuthor = async (userId, query) => {
    const result = await findPostByAuthorId(userId, query.cursorId);
    return readPostsResponseDTO(result);
};
