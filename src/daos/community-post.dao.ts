import db from "../models";
import { CreateCommunityPostSchema } from "../schemas/community-post.schema";
// import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

// const defaultLimit = 20;

// export const findCommunityPost = async (userId?: number, cursorId?: number) => {
//     const postsBeforeCursor = generateCursorCondition(cursorId);

//     const bookmarkInclude: any[] = [];
//     if (userId) {
//         bookmarkInclude.push({
//             model: db.CommunityBookmark,
//             where: {
//                 userId,
//             },
//             required: false,
//             attributes: ["id"],
//         });
//     }

//     const posts = await db.CommunityPost.findAll({
//         raw: true,
//         where: postsBeforeCursor,
//         order: [["createdAt", "DESC"]],
//         limit: defaultLimit,
//         attributes: ["id", "title", "createdAt"],
//         include: bookmarkInclude,
//     });
//     return { posts, hasNext: calculateHasNext(posts, defaultLimit) };
// };

export const getCommunityPost = async (postId: number) => {
    return await db.CommunityPost.findOne({
        raw: true,
        where: {
            id: postId,
        },
        attributes: ["title", "content", "link"],
    });
};

export const insertCommunityPost = async (userId: number, data: CreateCommunityPostSchema) => {
    await db.CommunityPost.create({
        title: data.title,
        content: data.content,
        link: data.link,
        authorId: userId,
    });
};
