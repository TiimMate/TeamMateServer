import { findPostByAuthorId } from "../daos/post.dao";
import { readPostsResponseDTO } from "../dtos/posts.dto";

export const readPostsByAuthor = async (userId, query) => {
    const result = await findPostByAuthorId(userId, query.cursorId);
    return readPostsResponseDTO(result);
};
