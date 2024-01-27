import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readPostsByAuthor } from "../services/posts.service";

export const fetchMyPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readPostsByAuthor(req.user.id, req.query)));
};
