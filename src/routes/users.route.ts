import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { readUserProfileSchema, updateUserProfileSchema } from "../schemas/user-profile.schema";
import { fetchUserProfile, modifyUserProfile } from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.use(verifyUser);

usersRouter.get("/profiles/:category", validate(readUserProfileSchema), asyncHandler(fetchUserProfile));

usersRouter.put("/profiles/:category", validate(updateUserProfileSchema), asyncHandler(modifyUserProfile));
