import { Op } from "sequelize";
import db from "../models";

const defaultLimit = 20;

export const findCommunityPost = async (userId?: number, cursorId?: number) => {
    const postsBeforeCursor = cursorId ? { id: { [Op.lt]: cursorId } } : {};

    const bookmarkInclude: any[] = [];
    if (userId) {
        bookmarkInclude.push({
            model: db.CommunityBookmark,
            where: {
                userId,
            },
            required: false,
            attributes: ["id"],
        });
    }

    const posts = await db.CommunityPost.findAll({
        raw: true,
        where: postsBeforeCursor,
        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        attributes: ["id", "title", "createdAt"],
        include: bookmarkInclude,
    });
    const hasNext = posts.length === defaultLimit;
    return { posts, hasNext };
};
