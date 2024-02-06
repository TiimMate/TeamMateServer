import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import {
    InsertGuestUser,
    findGuesting,
    findGuestingByGender,
    findGuestingByLevel,
    findGuestingByRegion,
    getDetailedGuesting,
    getGuestingById,
    insertGuesting,
    setGuesting,
} from "../daos/guest.dao";
import { readMembersInfo } from "./teams.service";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { getTeamByLeaderId, getTeamDetailforGuesting } from "../daos/team.dao";
import { getUserInfoByCategory, getUserProfileByCategory } from "../daos/user.dao";
import { readGuestingDetailResponseDTO, readGuestingResponseDTO } from "../dtos/guests.dto";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { checkForDuplicateGuestUser } from "../daos/guest-user.dao";

export const createGuesting = async (userId, body: CreateGuestingBody) => {
    const teamId = body.teamId;
    const team = await getTeamByLeaderId(teamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_LEADER_NOT_FOUND);
    }
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
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByGender = async (query) => {
    const guestings = await findGuestingByGender(query.date, query.category, query.gender);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByLevel = async (query) => {
    const guestings = await findGuestingByLevel(query.date, query.category, query.skillLevel);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByRegion = async (query) => {
    const guestings = await findGuestingByRegion(query.date, query.category, query.region);
    for (const guesting of guestings) {
        guesting.memberCount = (await getMemberCountByTeamId(guesting["Team.id"])) + 1;
    }
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

export const addGuestUser = async (userId, query, params) => {
    const guestingId = params.guestingId;
    const userProfile = await getUserProfileByCategory(userId, query.category);
    const userProfileVerify: boolean =
        userProfile.gender ||
        userProfile.ageGroup ||
        userProfile["Profile.region"] ||
        userProfile["Profile.height"] ||
        userProfile["Profile.position"] ||
        userProfile["Profile.description"];
    const checkGuestUser = await checkForDuplicateGuestUser(userId, guestingId);
    if (!userProfile) {
        throw new BaseError(status.GUESTUSER_NOT_FOUND);
    } else if (!userProfileVerify) {
        throw new BaseError(status.NOT_FILL_USER_PROFILE);
    } else if (checkGuestUser) {
        throw new BaseError(status.GUESTUSER_ALREADY_EXIST);
    }

    await InsertGuestUser(guestingId, userId);
    return;
};
