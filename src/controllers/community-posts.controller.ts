import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import { readCommunityPosts } from "../services/community-posts.service";

export const fetchCommunityPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readCommunityPosts(req.user?.id, req.query)));
};
