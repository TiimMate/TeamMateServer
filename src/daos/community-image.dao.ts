import db from "../models";

export const findCommunityImage = async (postId: number) => {
    return await db.CommunityImage.findAll({
        where: {
            postId,
        },
        attributes: ["url"],
    });
};
