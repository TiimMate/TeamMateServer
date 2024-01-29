import express from "express";
import asyncHandler from "express-async-handler";
import { authKakao, authNaver, refreshAccessToken } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/kakao", asyncHandler(authKakao));

authRouter.post("/naver", asyncHandler(authNaver));

authRouter.post("/refresh", asyncHandler(refreshAccessToken));
