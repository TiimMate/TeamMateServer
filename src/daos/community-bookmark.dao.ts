import db from "../models";

export const insertOrDeleteBookmark = async (userId, postId) => {
    const bookmark = await getCommunityBookmark(userId, postId);

    if (bookmark) {
        await bookmark.destroy();
    } else {
        await db.CommunityBookmark.create({
            postId,
            userId,
        });
    }
};

export const getCommunityBookmark = async (userId: number, postId: number) => {
    return await db.CommunityBookmark.findOne({
        where: {
            postId,
            userId,
        },
    });
};
