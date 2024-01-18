import express from "express";
import passport from "passport";
import asyncHandler from "express-async-handler";
import { googleCallback, kakaoCallback, naverCallback, refreshAccessToken } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google", { session: false }), asyncHandler(googleCallback));

authRouter.get("/kakao", passport.authenticate("kakao"));
authRouter.get("/kakao/callback", passport.authenticate("kakao", { session: false }), asyncHandler(kakaoCallback));

authRouter.get("/naver", passport.authenticate("naver"));
authRouter.get("/naver/callback", passport.authenticate("naver", { session: false }), asyncHandler(naverCallback));

authRouter.post("/refresh", asyncHandler(refreshAccessToken));
