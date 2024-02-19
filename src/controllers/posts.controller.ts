import { Request, Response } from "express";
import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    createOrDeleteBookmark,
    readBookmarkedPosts,
    readPost,
    readCommunityPosts,
    readMyCommunityPosts,
    createCommunityPost,
    createComment,
    readComments,
    createRentPost,
    readRentPosts,
    readMyRentPosts,
    updateRentPost,
} from "../services/posts.service";

export const fetchCommunityPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readCommunityPosts(req.user?.id, req.query)));
};

export const fetchMyCommunityPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readMyCommunityPosts(req.user.id, req.query)));
};

export const fetchMyRentPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readMyRentPosts(req.user.id, req.query)));
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

export const addCommunityPost = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createCommunityPost(req.user.id, req.body)));
};

export const addComment = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createComment(req.user.id, req.params, req.body)));
};

export const fetchComments = async (req: Request, res: Response, next) => {
    res.send(response(status.SUCCESS, await readComments(req.params, req.query)));
};

export const addRentPost = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createRentPost(req.user.id, req.body)));
};

export const modifyRentPost = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateRentPost(req.user.id, req.body, req.params)));
};

export const fetchRentPosts = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readRentPosts(req.user?.id, req.query)));
};
