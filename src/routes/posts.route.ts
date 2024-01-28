import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addOrRemoveBookmark,
    fetchBookmarkedPosts,
    fetchPost,
    fetchCommunityPosts,
    fetchMyPosts,
} from "../controllers/posts.controller";

export const postsRouter = express.Router();

postsRouter.get("/", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

postsRouter.get("/authors/me", verifyUser, asyncHandler(fetchMyPosts));

postsRouter.get("/bookmarks", verifyUser, asyncHandler(fetchBookmarkedPosts));

postsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

postsRouter.get("/:postId", verifyUser, asyncHandler(fetchPost));
