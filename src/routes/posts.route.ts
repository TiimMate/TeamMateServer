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
} from "../controllers/posts.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createPost } from "../schemas/post.schema";
import { createComment } from "../schemas/comment.schema";

export const postsRouter = express.Router();

postsRouter.post("/community", verifyUser, validateBody(createPost), asyncHandler(addCommunityPost));

postsRouter.get("/community", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

postsRouter.get("/authors/me", verifyUser, asyncHandler(fetchMyPosts));

postsRouter.get("/bookmarks", verifyUser, asyncHandler(fetchBookmarkedPosts));

postsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

postsRouter.post("/:postId/comments", verifyUser, validateBody(createComment), asyncHandler(addComment));

postsRouter.get("/:postId/comments", verifyUser, asyncHandler(fetchComments));

postsRouter.get("/:postId", verifyUser, asyncHandler(fetchPost));
