import db from "../models";

export const getUserByProviderId = async (provider, providerId) => {
    return await db.User.findOne({
        raw: true,
        where: {
            provider,
            providerId,
        },
    });
};

export const insertUser = async (provider, providerId, email) => {
    const nickname = email.split("@")[0];
    return await db.User.create({
        nickname,
        provider,
        providerId,
        email,
    });
};

export const setRefreshToken = async (refreshToken: string, userId: number) => {
    await db.User.update(
        { refreshToken },
        {
            where: {
                id: userId,
            },
        },
    );
};

// export const getRefreshToken = async (userId: number) => {
//     const user = await db.User.findOne({
//         raw: true,
//         where: {
//             id: userId,
//         },
//         attributes: ["refreshToken"],
//     });
//     return user.refreshToken;
// };
