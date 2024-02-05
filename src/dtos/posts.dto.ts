import { convertToKST } from "../utils/time-zone.util";

export const readPostsResponseDTO = (result) => {
    return {
        posts: result.posts.map((post) => ({
            id: post.id,
            isBookmarked: Boolean(post["Bookmarks.id"]),
            title: post.title,
            createdAt: convertToKST(post.createdAt),
        })),
        hasNext: result.hasNext,
    };
};

export const readPostResponseDTO = (post, imageUrls, commentCount, comments, isBookmarked) => {
    return {
        post: {
            title: post.title,
            contnet: post.content,
            link: post.link,
            imageUrls: imageUrls,
        },
        isBookmarked,
        commentCount,
        ...readCommentsResonseDTO(comments),
    };
};

export const readCommentsResonseDTO = (comments) => {
    return {
        comments: comments.ascendingComments.map((comment) => ({
            id: comment.id,
            nickname: comment["User.nickname"],
            content: comment.content,
            createdAt: convertToKST(comment.createdAt),
        })),
        commentHasNext: comments.hasNext,
    };
};
