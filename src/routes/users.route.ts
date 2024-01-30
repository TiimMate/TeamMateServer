import express from "express";
import asyncHandler from "express-async-handler";
import { fetchUserProfileByCategory } from "../controllers/users.controller";
import { validateParams } from "../middlewares/validate.middleware";
import { category } from "../schemas/team.schema";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { modifyUserProfile } from "../controllers/users.controller";
import { updateUserProfileSchema } from "../schemas/user-profile.schema";

export const usersRouter = express.Router();

usersRouter.use(verifyUser);

usersRouter.get("/profiles/:category", validateParams(category), asyncHandler(fetchUserProfileByCategory));

usersRouter.put("/profiles/:category", validate(updateUserProfileSchema), asyncHandler(modifyUserProfile));

