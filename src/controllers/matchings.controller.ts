import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    readApplyGuestingUser,
    readMatchingGuesting,
    readMatchingHosting,
    updateGuestStatus,
} from "../services/matchings.service";

export const matchingGuestingPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readMatchingGuesting(1, req.query)));
    // return res.send(response(status.SUCCESS, await readMatchingGuesting(req.user.id, req.query)));
};

export const matchingHostingPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readMatchingHosting(1, req.query)));
    // return res.send(response(status.SUCCESS, await readMatchingHosting(req.user.id, req.query)));
};

export const ApplyGuestingUserPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readApplyGuestingUser(req.params)));
};

export const modifyGuestStatus = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await updateGuestStatus(req.params)));
};
