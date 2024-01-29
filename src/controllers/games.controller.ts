import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readGamesByDate, readGamesByGender, readGamesByLevel, readGamesByRegion } from "../services/games.service";
import { readTeamAvailPreviewById } from "../services/teams.service";

export const fetchGamesByDate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByDate(req.query)));
};

export const fetchGamesByGender = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByGender(req.query)));
};

export const fetchGamesByLevel = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByLevel(req.query)));
};

export const fetchGamesByRegion = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByRegion(req.query)));
};

export const fetchTeamsAvailById = async (req, res, next) => {
    // res.send(response(status.SUCCESS, await readTeamAvailPreviewById(req.user.id, req.query)));
    res.send(response(status.SUCCESS, await readTeamAvailPreviewById(1, req.query))); // test
};
