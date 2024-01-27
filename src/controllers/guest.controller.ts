import { response } from "../config/response";
import { status } from "../config/response.status";
import {
    readGuesting,
    readGuestingByLevel,
    readGuestingByGender,
    readGuestingByRegion,
} from "../services/guest.service";
// import { postGuesting } from "../services/guest.service";

// export const createGuesting = async (req, res, next) => {
//     return res.send(response(status.SUCCESS, await postGuesting(req.params.category, req.query)));
// };

export const GuestingPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readGuesting(req.query)));
};

export const GuestingPreviewByLevel = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readGuestingByLevel(req.query)));
};

export const GuestingPreviewByGender = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readGuestingByGender(req.query)));
};

export const GuestingPreviewByRegion = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await readGuestingByRegion(req.query)));
};

// export const DetailedGuestingPreview = async (req, res, next) => {
//     return res.send(response(status.SUCCESS, await getDetailedGuesting(req.team.id, req.params)));
// };
