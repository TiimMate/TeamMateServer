export const readCommunityPostsResponseDTO = (response) => {
    return {
        posts: response.posts.map((post) => ({
            id: post.id,
            isBookmarked: Boolean(post["CommunityBookmarks.id"]),
            title: post.title,
            createdAt: post.createdAt,
        })),
        hasNext: response.hasNext,
    };
};

export const readCommunityPostResponseDTO = (post, imageUrls, commentCount, comments, isBookmarked) => {
    return {
        post: {
            title: post.title,
            contnet: post.content,
            link: post.link,
            imageUrls: imageUrls,
        },
        isBookmarked,
        commentCount,
        ...readCommunityCommentsResonseDTO(comments),
    };
};

export const readCommunityCommentsResonseDTO = (comments) => {
    return {
        comments: comments.ascendingComments.map((comment) => ({
            id: comment.id,
            nickname: comment["User.nickname"],
            content: comment.content,
            createdAt: comment.createdAt,
        })),
        commentHasNext: comments.hasNext,
    };
};
