import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readTeamPreviews, readTeamDetail, createTeam, updateTeam } from "../services/teams.service";

export const fetchTeamPreviews = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readTeamPreviews(req.user.id, req.query)));
};

export const addTeam = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createTeam(req.user.id, req.body)));
};

export const modifyTeam = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateTeam(req.user.id, req.params, req.body)));
};

export const fetchTeamDetail = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readTeamDetail(req.user.id, req.params)));
};
