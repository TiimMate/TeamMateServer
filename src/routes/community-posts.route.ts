import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUserIfExists } from "../middlewares/auth.middleware";
import { fetchCommunityPosts } from "../controllers/community-posts.controller";

export const communityPostsRouter = express.Router();

communityPostsRouter.get("/", verifyUserIfExists, asyncHandler(fetchCommunityPosts));
