import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { fetchMyPosts } from "../controllers/posts.controller";

export const postsRouter = express.Router();

postsRouter.use(verifyUser);

postsRouter.get("/my", asyncHandler(fetchMyPosts));
