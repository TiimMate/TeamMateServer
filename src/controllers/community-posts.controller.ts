import { Request, Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    createCommunityComment,
    // createCommunityPost,
    // createOrDeleteBookmark,
    readCommunityComments,
    // readCommunityPost,
    // readCommunityPosts,
} from "../services/community-posts.service";

// export const fetchCommunityPosts = async (req, res: Response, next) => {
//     res.send(response(status.SUCCESS, await readCommunityPosts(req.user?.id, req.query)));
// };

// export const addOrRemoveBookmark = async (req, res: Response, next) => {
//     res.send(response(status.SUCCESS, await createOrDeleteBookmark(req.user.id, req.params)));
// };

// export const fetchCommunityPost = async (req, res: Response, next) => {
//     res.send(response(status.SUCCESS, await readCommunityPost(req.user.id, req.params)));
// };

export const fetchCommunityComments = async (req: Request, res: Response, next) => {
    res.send(response(status.SUCCESS, await readCommunityComments(req.params, req.query)));
};

// export const addCommunityPost = async (req, res: Response, next) => {
//     res.send(response(status.SUCCESS, await createCommunityPost(req.user.id, req.body)));
// };

export const addCommunityComment = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createCommunityComment(req.user.id, req.params, req.body)));
};
