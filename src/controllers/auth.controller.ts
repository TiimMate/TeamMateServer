import { Request } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { login, generateNewAccessToken } from "../services/auth.service";

export const googleCallback = async (req, res, next) => {
    res.send(response(status.SUCCESS, await login(req.user)));
};

export const kakaoCallback = async (req, res, next) => {
    res.send(response(status.SUCCESS, await login(req.user)));
};

// export const naverCallback = async (req, res, next) => {
//     res.send(response(status.SUCCESS, await login(req.user)));
// };

export const refreshAccessToken = async (req: Request, res, next) => {
    res.send(response(status.SUCCESS, await generateNewAccessToken(req)));
};
