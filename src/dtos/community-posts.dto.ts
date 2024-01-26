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
