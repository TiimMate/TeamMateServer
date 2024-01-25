import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { createTeam } from "../schemas/team.schema";
import { fetchTeamPreviewsByCategory, fetchTeamDetail, addTeam } from "../controllers/teams.controller";

export const teamsRouter = express.Router();

teamsRouter.use(verifyUser);

teamsRouter.get("/", asyncHandler(fetchTeamPreviewsByCategory));

teamsRouter.post("/", validateBody(createTeam), asyncHandler(addTeam));

// teamsRouter.put("/:teamId", asyncHandler(modifyTeam));

teamsRouter.get("/:teamId", asyncHandler(fetchTeamDetail));
