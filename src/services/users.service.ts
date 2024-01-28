import { getUserByProviderId, insertUser, setRefreshToken } from "../daos/user.dao";
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
