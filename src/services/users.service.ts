import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getUserByProviderId, getUserProfileByCategory, insertUser, setRefreshToken } from "../daos/user.dao";
import { readUserProfileByCategoryResponseDTO } from "../dtos/users.dto";

export type Payload = {
    id: number;
    nickname: string;
};

export const createOrReadUser = async (provider, providerId, email): Promise<Payload> => {
    if (!provider || !providerId || !email) {
        throw new BaseError(status.MISSING_REQUIRED_FIELDS);
    }
    let user = await getUserByProviderId(provider, providerId);
    if (!user) {
        user = await insertUser(provider, providerId, email);
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
