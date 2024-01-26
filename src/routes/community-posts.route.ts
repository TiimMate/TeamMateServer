import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addOrRemoveBookmark,
    fetchCommunityPost,
    fetchCommunityPosts,
} from "../controllers/community-posts.controller";

export const communityPostsRouter = express.Router();

communityPostsRouter.get("/", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

communityPostsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

communityPostsRouter.get("/:postId", verifyUser, asyncHandler(fetchCommunityPost));
