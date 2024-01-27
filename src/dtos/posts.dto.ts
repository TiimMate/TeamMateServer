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
