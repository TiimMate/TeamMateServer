import { Request } from "express";
import { createOrReadUser, updateRefreshToken } from "./users.service";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getRefreshToken } from "../daos/user.dao";
import {
    generateAccessToken,
    generateRefreshToken,
    extractAccessToken,
    extractRefreshToken,
    verifyAccessToken,
    isRefreshTokenValid,
} from "../utils/jwt.util";
import redaxios from "redaxios";
import { UserInfo } from "../types/user-info.interface";
import { Provider } from "../types/provider.enum";
import { Payload } from "../types/payload.interface";

export const tokenType = "Bearer ";

export const kakaoLogin = async (body) => {
    const accessToken = await getKakaoAccessToken(body.code);
    const userInfo = await retrieveKakaoUserInfo(accessToken);
    const payload = await createOrReadUser(userInfo);
    return login(payload);
};

const getKakaoAccessToken = async (code: string) => {
    const url = "https://kauth.kakao.com/oauth/token";
    const response = await redaxios.post(
        url,
        `grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
        {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        },
    );
    return response.data.access_token;
};

const retrieveKakaoUserInfo = async (accessToken: string): Promise<UserInfo> => {
    const url = "https://kapi.kakao.com/v2/user/me";
    const response = await redaxios.get(url, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });
    return {
        provider: Provider.KAKAO,
        providerId: response.data.id,
        nickname: response.data.kakao_account.profile.nickname,
    };
};

export const login = async (payload: Payload) => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken();
    await updateRefreshToken(refreshToken, payload.id);
    return { tokenType, accessToken, refreshToken };
};

export const generateNewAccessToken = async (req: Request) => {
    const accessToken = extractAccessToken(req);
    const refreshToken = extractRefreshToken(req);
    const verified = verifyAccessToken(accessToken);
    if (verified.isExpired) {
        if (isRefreshTokenValid(refreshToken) && (await isRefreshTokenMatching(refreshToken, verified.decoded.id))) {
            return await login({ id: verified.decoded.id, nickname: verified.decoded.nickname });
        }
        throw new BaseError(status.REFRESH_TOKEN_VERIFICATION_FAILED);
    }
    throw new BaseError(status.ACCESS_TOKEN_NOT_EXPIRED);
};

const isRefreshTokenMatching = async (refreshToken, userId: number) => {
    return refreshToken === (await getRefreshToken(userId));
};
