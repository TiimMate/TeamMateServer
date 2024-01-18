import jwt from "jsonwebtoken";
import { tokenType } from "../services/auth.service";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { Payload } from "../services/users.service";
import { Request } from "express";

interface Verified {
    isExpired: boolean;
    decoded: Decoded;
}

export interface Decoded extends Payload {
    iat: number;
    exp: number;
}

export const generateAccessToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
};

export const generateRefreshToken = (): string => {
    return jwt.sign({}, process.env.JWT_REFRESH_SECRET!, { expiresIn: "12h" });
};

export const extractAccessToken = (req: Request): string => {
    const accessToken = req.headers.authorization?.split(tokenType)[1];
    if (!accessToken) {
        throw new BaseError(status.MISSING_ACCESS_TOKEN);
    }
    return accessToken;
};

export const extractRefreshToken = (req: Request) => {
    const refreshToken = req.headers.refresh;
    if (!refreshToken) {
        throw new BaseError(status.MISSING_REFRESH_TOKEN);
    }
    return refreshToken;
};

export const verifyAccessToken = (accessToken: string): Verified => {
    try {
        return {
            isExpired: false,
            decoded: jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as Decoded,
        };
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return {
                isExpired: true,
                decoded: jwt.decode(accessToken) as Decoded,
            };
        }
        throw new BaseError(status.ACCESS_TOKEN_VERIFICATION_FAILED);
    }
};

export const isRefreshTokenValid = (refreshToken) => {
    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
