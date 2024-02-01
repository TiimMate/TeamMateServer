import { response } from "../config/response";
import { status } from "../config/response.status";
import { readMatchingGuesting, readMatchingHosting, readHostingApplicantsList } from "../services/matchings.service";

export const matchingGuestingPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readMatchingGuesting(2, req.query)));
    // return res.send(response(status.SUCCESS, await readMatchingGuesting(req.user.id, req.query)));
};

export const matchingHostingPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readMatchingHosting(1, req.query)));
    // return res.send(response(status.SUCCESS, await readMatchingHosting(req.user.id, req.query)));
};

export const fetchHostingApplicantsTeamList = async (req, res, next) => {
    // return res.send(response(status.SUCCESS, await readHostingApplicantsList(req.user.id, req.query)));
    return res.send(response(status.SUCCESS, await readHostingApplicantsList(1, req.params)));
};
