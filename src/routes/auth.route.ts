import express from "express";
import asyncHandler from "express-async-handler";
import { authKakao, refreshAccessToken } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/kakao", asyncHandler(authKakao));

authRouter.post("/refresh", asyncHandler(refreshAccessToken));
