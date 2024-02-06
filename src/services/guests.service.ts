import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import {
    findGuesting,
    findGuestingByGender,
    findGuestingByLevel,
    findGuestingByRegion,
    getDetailedGuesting,
    getGuestingById,
    insertGuesting,
    setGuesting,
} from "../daos/guest.dao";
import { readMembersInfo } from "../services/teams.service";
import { addMemberCount } from "../daos/member.dao";
import { getTeamDetailforGuesting, getTeamIdByLeaderId } from "../daos/team.dao";
import { getUserInfoByCategory } from "../daos/user.dao";
import { readGuestingDetailResponseDTO, readGuestingResponseDTO } from "../dtos/guests.dto";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { InsertGuestUser } from "../daos/guest-user.dao";

export const createGuesting = async (userId, body: CreateGuestingBody) => {
    const teamId = await getTeamIdByLeaderId(userId);
    await insertGuesting(teamId, body);
    return;
};

export const updateGuesting = async (userId, params, body: UpdateGuestingBody) => {
    const guestingId = params.guestingId;
    const guesting = await getGuestingById(guestingId, userId);
    if (!guesting) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }
    await setGuesting(guesting, body);
    return;
};

export const readGuesting = async (query) => {
    const guestings = await findGuesting(query.date, query.category);
    await addMemberCount(guestings);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByGender = async (query) => {
    const guestings = await findGuestingByGender(query.date, query.category, query.gender);
    await addMemberCount(guestings);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByLevel = async (query) => {
    const guestings = await findGuestingByLevel(query.date, query.category, query.skillLevel);
    await addMemberCount(guestings);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByRegion = async (query) => {
    const guestings = await findGuestingByRegion(query.date, query.category, query.region);
    await addMemberCount(guestings);
    return readGuestingResponseDTO(guestings);
};

export const readDetailedGuesting = async (params) => {
    const guestingId = params.guestingId;
    const guestingDetail = await getDetailedGuesting(guestingId);
    const TeamDetail = await getTeamDetailforGuesting(guestingDetail.teamId);
    const leaderInfo = await getUserInfoByCategory(TeamDetail.leaderId, TeamDetail.category);
    const memberInfo = await readMembersInfo(TeamDetail, TeamDetail.category);
    return readGuestingDetailResponseDTO(guestingDetail, TeamDetail, leaderInfo, memberInfo);
};

export const addGuestUser = async (userId, params) => {
    const guestingId = params.guestingId;
    await InsertGuestUser(guestingId, userId);
    return;
};
