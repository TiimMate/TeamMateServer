import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { addMember } from "../controllers/members.controller";

export const membersRouter = express.Router();

membersRouter.use(verifyUser);

membersRouter.post("/", asyncHandler(addMember));
