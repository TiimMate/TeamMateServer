import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addOrRemoveBookmark,
    fetchBookmarkedPosts,
    fetchPost,
    fetchCommunityPosts,
    fetchMyPosts,
    addCommunityPost,
} from "../controllers/posts.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createPost } from "../schemas/community-post.schema";

export const postsRouter = express.Router();

postsRouter.post("/community", verifyUser, validateBody(createPost), asyncHandler(addCommunityPost));

postsRouter.get("/community", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

postsRouter.get("/authors/me", verifyUser, asyncHandler(fetchMyPosts));

postsRouter.get("/bookmarks", verifyUser, asyncHandler(fetchBookmarkedPosts));

postsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

postsRouter.get("/:postId", verifyUser, asyncHandler(fetchPost));
