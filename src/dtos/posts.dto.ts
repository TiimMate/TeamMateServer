export const readPostsResponseDTO = (result) => {
    return {
        posts: result.posts.map((post) => ({
            id: post.id,
            isBookmarked: Boolean(post["Bookmarks.id"]),
            title: post.title,
            createdAt: post.createdAt,
        })),
        hasNext: result.hasNext,
    };
};

export const readRentPostsResponseDTO = (result) => {
    return {
        posts: result.posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            status: post.rentStatus,
        })),
        hasNext: result.hasNext,
    };
};

export const readPostResponseDTO = (post, commentCount, comments, isBookmarked) => {
    console.log(post);
    return {
        post: {
            title: post.title,
            content: post.content,
            imageUrls: post.link,
            mapCoordinateVal: post.rentMapValue,
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
            createdAt: comment.createdAt,
        })),
        commentHasNext: comments.hasNext,
    };
};
