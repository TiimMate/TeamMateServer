import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { createTeam, updateTeam } from "../schemas/team.schema";
import { fetchTeamPreviewsByCategory, fetchTeamDetail, addTeam, modifyTeam } from "../controllers/teams.controller";

export const teamsRouter = express.Router();

teamsRouter.use(verifyUser);

teamsRouter.get("/", asyncHandler(fetchTeamPreviewsByCategory));

teamsRouter.post("/", validateBody(createTeam), asyncHandler(addTeam));

teamsRouter.put("/:teamId", validateBody(updateTeam), asyncHandler(modifyTeam));

teamsRouter.get("/:teamId", asyncHandler(fetchTeamDetail));
