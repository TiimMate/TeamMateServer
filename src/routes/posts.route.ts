import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addOrRemoveBookmark,
    fetchBookmarkedPosts,
    fetchPost,
    fetchCommunityPosts,
    fetchMyCommunityPosts,
    addCommunityPost,
    addComment,
    fetchComments,
    addRentPost,
    fetchRentPosts,
    fetchMyRentPosts,
    modifyRentPost,
} from "../controllers/posts.controller";
import { validate } from "../middlewares/validate.middleware";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema";
import { createCommentSchema } from "../schemas/comment.schema";

export const postsRouter = express.Router();

postsRouter.post("/community", verifyUser, validate(createPostSchema), asyncHandler(addCommunityPost));

postsRouter.get("/community", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

postsRouter.get("/community/authors/me", verifyUser, asyncHandler(fetchMyCommunityPosts));

postsRouter.get("/rent/authors/me", verifyUser, asyncHandler(fetchMyRentPosts));

postsRouter.get("/bookmarks", verifyUser, asyncHandler(fetchBookmarkedPosts));

postsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

postsRouter.post("/:postId/comments", verifyUser, validate(createCommentSchema), asyncHandler(addComment));

postsRouter.get("/:postId/comments", verifyUser, asyncHandler(fetchComments));

postsRouter.get("/:postId", verifyUser, asyncHandler(fetchPost));

// 대관정보 글 작성
postsRouter.post("/rent", verifyUser, validate(createPostSchema), asyncHandler(addRentPost));

// 대관정보 글 수정
postsRouter.put("/:postId", verifyUser, validate(updatePostSchema), asyncHandler(modifyRentPost));

// 대관정보 글 목록 조회
postsRouter.get("/rent", verifyUserIfExists, asyncHandler(fetchRentPosts));
