import { getUserByProviderId, getUserProfileByCategory, insertUser, setRefreshToken } from "../daos/user.dao";
import { readUserProfileByCategoryResponseDTO } from "../dtos/users.dto";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getUserProfile, insertCategoryProfile, setCategoryProfile } from "../daos/profile.dao";
import { getUserById, getUserByProviderId, insertUser, setCommonProfile, setRefreshToken } from "../daos/user.dao";
import { UpdateUserProfileBody, CategoryProfile } from "../schemas/user-profile.schema";
import { Category } from "../types/category.enum";
import { Payload } from "../types/payload.interface";
import { UserInfo } from "../types/user-info.interface";

export const createOrReadUser = async (userInfo: UserInfo): Promise<Payload> => {
    let user = await getUserByProviderId(userInfo.provider, userInfo.providerId);
    if (!user) {
        user = await insertUser(userInfo.provider, userInfo.providerId, userInfo.nickname);
    }
    return { id: user.id, nickname: user.nickname };
};

export const updateRefreshToken = async (refreshToken: string, userId: number) => {
    await setRefreshToken(refreshToken, userId);
};

export const readUserProfileByCategory = async (userId, params) => {
    const profile = await getUserProfileByCategory(userId, params.category);
    return readUserProfileByCategoryResponseDTO(profile);
};

export const deleteRefreshToken = async (userId: number) => {
    await setRefreshToken(null, userId);
};

export const updateUserProfile = async (userId, params, body: UpdateUserProfileBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    const { description, region, position, ...commonProfile } = body;
    await setCommonProfile(userId, commonProfile);
    await createOrUpdateCategoryProfile(userId, params.category, { description, region, position });
    return;
};

const createOrUpdateCategoryProfile = async (userId: number, category: Category, categoryProfile: CategoryProfile) => {
    const profile = await getUserProfile(userId, category);
    if (!profile) {
        await insertCategoryProfile(userId, category, categoryProfile);
    } else {
        await setCategoryProfile(profile.id, categoryProfile);
    }
};
