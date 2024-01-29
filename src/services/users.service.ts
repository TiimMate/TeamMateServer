import { getUserByProviderId, getUserProfileByCategory, insertUser, setRefreshToken } from "../daos/user.dao";
import { readUserProfileByCategoryResponseDTO } from "../dtos/users.dto";
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
