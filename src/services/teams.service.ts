import { deleteMembersById, findMemberInfoByTeamId, findMemberToDelete } from "../daos/member.dao";
import { findTeamPreviewByCategory, getTeamById, getTeamDetail, insertTeam, setTeam } from "../daos/team.dao";
import { getUserInfoById, userInfoAttributes } from "../daos/user.dao";
import { readTeamDetailResponseDTO } from "../dtos/teams.dto";
import { v4 as uuidv4 } from "uuid";
import { CreateTeamSchema, UpdateTeamSchema } from "../schemas/team.schema";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";

export const readTeamPreviewsByCategory = async (userId, query) => {
    return await findTeamPreviewByCategory(userId, query.category);
};

export const createTeam = async (userId, body: CreateTeamSchema) => {
    await insertTeam(body, userId, uuidv4());
    return;
};

export const updateTeam = async (userId, params, body: UpdateTeamSchema) => {
    const teamId = params.teamId;
    const team = await getTeamById(params.teamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_NOT_FOUND);
    }

    const { memberIdsToDelete, ...bodyWithoutMemberIdsToDelete } = body;
    const members = await findMemberToDelete(memberIdsToDelete, teamId);
    if (members.length !== memberIdsToDelete?.length) {
        throw new BaseError(status.MEMBER_NOT_FOUND);
    }

    await deleteMembersById(members, teamId);
    await setTeam(team, bodyWithoutMemberIdsToDelete);
    return;
};

export const readTeamDetail = async (userId, params) => {
    const teamId = params.teamId;
    const detail = await getTeamDetail(teamId);
    const leaderInfo = await getUserInfoById(detail.leaderId);
    const memberInfo = await findMemberInfoByTeamId(teamId, userInfoAttributes);
    return readTeamDetailResponseDTO(detail, leaderInfo, memberInfo, userId == detail.leaderId);
};
