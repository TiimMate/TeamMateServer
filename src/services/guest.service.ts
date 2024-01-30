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
import { findMemberInfoByTeamId, getMemberCountByTeamId } from "../daos/member.dao";
import { getTeamById, getTeamDetailforGuesting, getTeamIdByLeaderId } from "../daos/team.dao";
import { getUser, getUserInfoById, userInfoAttributes } from "../daos/user.dao";
import { readGuestingDetailResponseDTO, readGuestingResponseDTO } from "../dtos/guests.dto";
import { CreateGuestingSchema, UpdateGuestingSchema } from "../schemas/guest.schema";

export const createGuesting = async (userId, body: CreateGuestingSchema) => {
    const teamId = await getTeamIdByLeaderId(userId);
    const team = await getTeamById(teamId, userId);
    if (!team) {
        // team 메뉴로 이동
    }
    await insertGuesting(teamId, body);
    return;
};

export const updateGuesting = async (userId, params, body: UpdateGuestingSchema) => {
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
    const leaderInfo = await getUserInfoById(TeamDetail.leaderId);
    const memberInfo = await findMemberInfoByTeamId(guestingDetail.teamId, userInfoAttributes);
    return readGuestingDetailResponseDTO(guestingDetail, TeamDetail, leaderInfo, memberInfo);
};

export const addGuestUser = async (userId, params) => {
    const guestingId = params.guestingId;
    const user = await getUser(userId);
    if (!user) {
        // user 정보 수정 API 연결
    }
    await InsertGuestUser(guestingId, userId);
    return;
};
