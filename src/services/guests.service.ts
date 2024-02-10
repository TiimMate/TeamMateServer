import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import {
    findGuestAll,
    findGuestByGender,
    findGuestByLevel,
    findGuestByRegion,
    getCategoryThroughTeamJoin,
    getDetailedGuesting,
    getGuestingById,
    insertGuesting,
    setGuesting,
} from "../daos/guest.dao";
import { readMembersInfo } from "../services/teams.service";
import { addMemberCount } from "../daos/member.dao";
import { getTeamByLeaderId, getTeamDetailforGuesting } from "../daos/team.dao";
import { getUserInfoByCategory, getUserProfileByCategory } from "../daos/user.dao";
import { readGuestingDetailResponseDTO, readGuestingResponseDTO } from "../dtos/guests.dto";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { InsertGuestUser, checkForDuplicateGuestUser } from "../daos/guest-user.dao";

export const createGuesting = async (userId: number, body: CreateGuestingBody) => {
    const teamId = body.teamId;
    const team = await getTeamByLeaderId(teamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_LEADER_NOT_FOUND);
    }
    await insertGuesting(teamId, body);
    return;
};

export const updateGuesting = async (userId: number, params, body: UpdateGuestingBody) => {
    const guestingId = params.guestingId;
    const guesting = await getGuestingById(guestingId, userId);
    if (!guesting) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }
    await setGuesting(guesting, body);
    return;
};

export const readGuesting = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestAll(query.date, query.category, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByGender = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestByGender(query.date, query.category, query.gender, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByLevel = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const level = parseInt(query.level);
    const guestings = await findGuestByLevel(query.date, query.category, level, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByRegion = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestByRegion(query.date, query.category, query.region, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readDetailedGuesting = async (params) => {
    const guestingId = params.guestingId;
    const guestingDetail = await getDetailedGuesting(guestingId);
    const TeamDetails = await getTeamDetailforGuesting(guestingDetail.teamId);
    const TeamDetail = TeamDetails[0];
    const leaderInfo = await getUserInfoByCategory(TeamDetail.leaderId, TeamDetail.category);
    const membersInfo = await readMembersInfo(TeamDetails, TeamDetail.category);

    return readGuestingDetailResponseDTO(guestingDetail, TeamDetail, leaderInfo, membersInfo);
};

export const addGuestUser = async (userId: number, params) => {
    const guestingId = params.guestingId;
    const category = await getCategoryThroughTeamJoin(guestingId);

    const existingGuestUser = await checkForDuplicateGuestUser(userId, guestingId);
    if (existingGuestUser) {
        throw new BaseError(status.GUESTUSER_ALREADY_EXIST);
    }

    const userProfile = await getUserProfileByCategory(userId, category);
    if (!isUserProfileValid(userProfile)) {
        throw new BaseError(status.NOT_FILL_USER_PROFILE);
    }

    await InsertGuestUser(guestingId, userId);
    return;
};

const isUserProfileValid = (userProfile): boolean => {
    return (
        // userProfile["Profiles.description"] &&
        userProfile.gender && userProfile.ageGroup && userProfile["Profiles.region"]
        // userProfile.height &&
        // userProfile["Profiles.position"]
    );
};
