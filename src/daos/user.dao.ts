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

export const getUserProfileByCategory = async (userId: number, category) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        include: [
            {
                model: db.Profile,
                where: {
                    category,
                },
                required: false,
                attributes: ["skillLevel", "mannerLevel", "region", "position", "description"],
            },
        ],
        attributes: ["nickname", "gender", "ageGroup"],
    });
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
