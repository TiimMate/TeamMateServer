import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    readApplyGuestingUser,
    readMatchingGuesting,
    readMatchingHosting,
    updateGuestStatus,
    readHostingApplicantsTeamList,
} from "../services/matchings.service";
import { addOpposingTeam } from "../services/teams.service";

export const matchingGuestingPreview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readMatchingGuesting(req.user.id, req.query)));
    // res.send(response(status.SUCCESS, await readMatchingGuesting(1, req.query)));
};

export const matchingHostingPreview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readMatchingHosting(req.user.id, req.query)));
    // res.send(response(status.SUCCESS, await readMatchingHosting(1, req.query)));
};

export const ApplyGuestingUserPreview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readApplyGuestingUser(req.params)));
};

export const modifyGuestStatus = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateGuestStatus(req.params)));
};

export const fetchHostingApplicantsTeamList = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readHostingApplicantsTeamList(req.user.id, req.query)));
};

export const gameApplicationApproval = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await addOpposingTeam(req.user.id, req.params, req.body)));
    // return res.send(response(status.SUCCESS, await addOpposingTeam(1, req.params, req.body))); // for testing
};
