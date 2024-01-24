import express from "express";
import asyncHandler from "express-async-handler";
import { fetchTeamPreviewByCategory } from "../controllers/teams.controller";
import { verifyUser } from "../middlewares/auth.middleware";
// import { registerTeam } from "../controllers/teams.controller";
// import { validateInput } from "../middlewares/validate.middleware";
// import { createTeamSchema } from "../schemas/team.schema";

export const teamsRouter = express.Router();

// teamsRouter.use(verifyUser);

teamsRouter.get("/:category", asyncHandler(fetchTeamPreviewByCategory));

// teamsRouter.post("/", validateInput(createTeamSchema), asyncHandler(registerTeam));
