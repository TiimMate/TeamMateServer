import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { modifyUserProfile } from "../controllers/users.controller";
import { updateUserProfileSchema } from "../schemas/user-profile.schema";
import { validate } from "../middlewares/validate.middleware";

export const usersRouter = express.Router();

usersRouter.put("/profiles/:category", verifyUser, validate(updateUserProfileSchema), asyncHandler(modifyUserProfile));
