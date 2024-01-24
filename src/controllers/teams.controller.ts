import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readTeamPreviewsByCategory, readTeamDetail } from "../services/teams.service";
// import { createTeam } from "../services/teams.service";

export const fetchTeamPreviewsByCategory = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readTeamPreviewsByCategory(req.user.id, req.query)));
};

// export const registerTeam = async (req, res: Response, next) => {
//     res.send(response(status.SUCCESS, await createTeam(req.body)));
// };

export const fetchTeamDetail = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readTeamDetail(req.user.id, req.params)));
};
