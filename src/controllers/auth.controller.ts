import { Request, Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { kakaoLogin, naverLogin, generateNewAccessToken } from "../services/auth.service";

export const authKakao = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await kakaoLogin(req.body)));
};

export const authNaver = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await naverLogin(req.body)));
};

export const refreshAccessToken = async (req: Request, res, next) => {
    res.send(response(status.SUCCESS, await generateNewAccessToken(req)));
};
