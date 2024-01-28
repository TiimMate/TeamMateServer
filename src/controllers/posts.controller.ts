import { Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    createOrDeleteBookmark,
    readBookmarkedPosts,
    readPost,
    readCommunityPosts,
    readPostsByAuthor,
} from "../services/posts.service";

export const fetchCommunityPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readCommunityPosts(req.user?.id, req.query)));
};

export const fetchMyPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readPostsByAuthor(req.user.id, req.query)));
};

export const fetchBookmarkedPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readBookmarkedPosts(req.user.id, req.query)));
};

export const addOrRemoveBookmark = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createOrDeleteBookmark(req.user.id, req.params)));
};

export const fetchPost = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readPost(req.user.id, req.params)));
};
