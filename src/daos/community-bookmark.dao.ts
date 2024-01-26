import db from "../models";

export const insertOrDeleteBookmark = async (userId, postId) => {
    const bookmark = await db.CommunityBookmark.findOne({
        where: {
            postId,
            userId,
        },
    });

    if (bookmark) {
        await bookmark.destroy();
    } else {
        await db.CommunityBookmark.create({
            postId,
            userId,
        });
    }
};
