import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { NextFunction, Request, Response } from "express";
import { extractAccessToken, verifyAccessToken } from "../utils/jwt.util";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = extractAccessToken(req);
    const verified = verifyAccessToken(accessToken);
    if (verified.isExpired) {
        throw new BaseError(status.ACCESS_TOKEN_EXPIRED);
    } else {
        req.user = {
            id: verified.decoded.id,
            nickname: verified.decoded.nickname,
        };
        next();
    }
};
