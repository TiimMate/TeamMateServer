import { Request } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { kakaoLogin, generateNewAccessToken } from "../services/auth.service";

export const authKakao = async (req, res, next) => {
    res.send(response(status.SUCCESS, await kakaoLogin(req.body)));
};

export const refreshAccessToken = async (req: Request, res, next) => {
    res.send(response(status.SUCCESS, await generateNewAccessToken(req)));
};
