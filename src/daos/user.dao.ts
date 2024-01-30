import db from "../models";
import { CommonProfile } from "../schemas/user-profile.schema";

export const getUserByProviderId = async (provider, providerId) => {
    return await db.User.findOne({
        raw: true,
        where: {
            provider,
            providerId,
        },
    });
};

export const insertUser = async (provider, providerId, nickname) => {
    return await db.User.create({
        nickname,
        provider,
        providerId,
    });
};

export const setRefreshToken = async (refreshToken: string | null, userId: number) => {
    await db.User.update(
        { refreshToken },
        {
            where: {
                id: userId,
            },
        },
    );
};

export const getRefreshToken = async (userId: number) => {
    const user = await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        attributes: ["refreshToken"],
    });
    return user.refreshToken;
};

export const getUserById = async (id) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id,
        },
    });
};

export const getUserInfoById = async (id) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id,
        },
        attributes: userInfoAttributes(),
    });
};

export const userInfoAttributes = () => {
    return ["nickname"]; //TODO: add height, weight, positon
};

export const setCommonProfile = async (userId: number, commonProfile: CommonProfile) => {
    await db.User.update(
        { ...commonProfile },
        {
            where: {
                id: userId,
            },
        },
    );
};
