import express from "express";
import asyncHandler from "express-async-handler";
import { fetchTeamPreviewsByCategory, fetchTeamDetail } from "../controllers/teams.controller";
import { verifyUser } from "../middlewares/auth.middleware";
// import { registerTeam } from "../controllers/teams.controller";
// import { validateInput } from "../middlewares/validate.middleware";
// import { createTeamSchema } from "../schemas/team.schema";

export const teamsRouter = express.Router();

// teamsRouter.use(verifyUser);

teamsRouter.get("/", asyncHandler(fetchTeamPreviewsByCategory));

// teamsRouter.post("/", validateInput(createTeamSchema), asyncHandler(registerTeam));

teamsRouter.get("/:teamId", asyncHandler(fetchTeamDetail));
