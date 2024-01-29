import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readGamesByDate, readGamesByGender, readGamesByLevel, readGamesByRegion } from "../services/games.service";

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
