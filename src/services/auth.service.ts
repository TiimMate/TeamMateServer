import { Request } from "express";
import { Payload, updateRefreshToken } from "./users.service";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
// import { getRefreshToken } from "../daos/user.dao";
import {
    generateAccessToken,
    generateRefreshToken,
    // extractAccessToken,
    // extractRefreshToken,
    // verifyAccessToken,
    // isRefreshTokenValid,
} from "../utils/jwt.util";

export const tokenType = "Bearer ";

export const login = async (payload: Payload) => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken();
    await updateRefreshToken(refreshToken, payload.id);
    return { tokenType, accessToken, refreshToken };
};

// export const generateNewAccessToken = async (req: Request) => {
//     const accessToken = extractAccessToken(req);
//     const refreshToken = extractRefreshToken(req);
//     const verified = verifyAccessToken(accessToken);
//     if (verified.isExpired) {
//         if (isRefreshTokenValid(refreshToken) && (await isRefreshTokenMatching(refreshToken, verified.decoded.id))) {
//             return await login({ id: verified.decoded.id, nickname: verified.decoded.nickname });
//         }
//         throw new BaseError(status.REFRESH_TOKEN_VERIFICATION_FAILED);
//     }
//     throw new BaseError(status.ACCESS_TOKEN_NOT_EXPIRED);
// };

// const isRefreshTokenMatching = async (refreshToken, userId: number) => {
//     return refreshToken === (await getRefreshToken(userId));
// };
