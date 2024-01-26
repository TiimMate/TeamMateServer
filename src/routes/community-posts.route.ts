import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addCommunityPost,
    addOrRemoveBookmark,
    fetchCommunityComments,
    fetchCommunityPost,
    fetchCommunityPosts,
} from "../controllers/community-posts.controller";
import { createCommunityPost } from "../schemas/community-post.schema";
import { validateBody } from "../middlewares/validate.middleware";

export const communityPostsRouter = express.Router();

communityPostsRouter.get("/", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

communityPostsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

communityPostsRouter.get("/:postId", verifyUser, asyncHandler(fetchCommunityPost));

communityPostsRouter.get("/:postId/comments", verifyUser, asyncHandler(fetchCommunityComments));

communityPostsRouter.post("/", verifyUser, validateBody(createCommunityPost), asyncHandler(addCommunityPost));
