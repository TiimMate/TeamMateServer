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
    addComment,
    fetchComments,
    addRentPost,
    fetchRentPosts,
} from "../controllers/posts.controller";
import { validate } from "../middlewares/validate.middleware";
import { createPostSchema } from "../schemas/post.schema";
import { createCommentSchema } from "../schemas/comment.schema";

export const postsRouter = express.Router();

postsRouter.post("/community", verifyUser, validate(createPostSchema), asyncHandler(addCommunityPost));

postsRouter.get("/community", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

postsRouter.post("/rent", verifyUser, validate(createPostSchema), asyncHandler(addRentPost));

postsRouter.get("/rent", verifyUserIfExists, asyncHandler(fetchRentPosts));

postsRouter.get("/authors/me", verifyUser, asyncHandler(fetchMyPosts));

postsRouter.get("/bookmarks", verifyUser, asyncHandler(fetchBookmarkedPosts));

postsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

postsRouter.post("/:postId/comments", verifyUser, validate(createCommentSchema), asyncHandler(addComment));

postsRouter.get("/:postId/comments", verifyUser, asyncHandler(fetchComments));

postsRouter.get("/:postId", verifyUser, asyncHandler(fetchPost));
