import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readUserProfileByCategory } from "../services/users.service";
import { updateUserProfile } from "../services/users.service";

export const fetchUserProfileByCategory = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readUserProfileByCategory(req.user.id, req.params)));
};

export const modifyUserProfile = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateUserProfile(req.user.id, req.params, req.body)));
};
