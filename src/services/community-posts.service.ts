import { findCommunityPost } from "../daos/community-post.dao";
import { readCommunityPostsResponseDTO } from "../dtos/community-posts.dto";

export const readCommunityPosts = async (userId: number | undefined, query) => {
    const response = await findCommunityPost(userId, query.cursorId);
    return readCommunityPostsResponseDTO(response);
};
