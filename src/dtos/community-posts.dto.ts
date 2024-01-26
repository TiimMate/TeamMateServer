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

export const readCommunityPostResponseDTO = (post, imageUrls, comments, isBookmarked) => {
    console.log(post);
    return {
        post: {
            title: post.title,
            contnet: post.content,
            link: post.link,
            imageUrls: imageUrls,
        },
        isBookmarked,
        commentCount: comments.ascendingComments.length,
        comments: comments.ascendingComments.map((comment) => ({
            nickname: comment["User.nickname"],
            content: comment.content,
            createdAt: comment.createdAt,
        })),
        commentHasNext: comments.hasNext,
    };
};
