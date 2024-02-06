import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createTeamSchema, readTeamPreviewsSchema, updateTeamSchema } from "../schemas/team.schema";
import { fetchTeamPreviews, fetchTeamDetail, addTeam, modifyTeam } from "../controllers/teams.controller";

export const teamsRouter = express.Router();

teamsRouter.use(verifyUser);

teamsRouter.post("/", validate(createTeamSchema), asyncHandler(addTeam));

teamsRouter.get("/", validate(readTeamPreviewsSchema), asyncHandler(fetchTeamPreviews));

teamsRouter.put("/:teamId", validate(updateTeamSchema), asyncHandler(modifyTeam));

teamsRouter.get("/:teamId", asyncHandler(fetchTeamDetail));
