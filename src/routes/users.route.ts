import express from "express";
import asyncHandler from "express-async-handler";
import { fetchUserProfileByCategory } from "../controllers/users.controller";
import { validateParams } from "../middlewares/validate.middleware";
import { category } from "../schemas/team.schema";
import { verifyUser } from "../middlewares/auth.middleware";

export const usersRouter = express.Router();

usersRouter.use(verifyUser);

usersRouter.get("/profiles/:category", validateParams(category), asyncHandler(fetchUserProfileByCategory));
