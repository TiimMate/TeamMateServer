import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { createTeamReview } from "../services/reviews.service";

export const addTeamReview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createTeamReview(req.user.id, req.body)));
};
