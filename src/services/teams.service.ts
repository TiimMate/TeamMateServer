import { findMemberInfoByTeamId } from "../daos/member.dao";
import { findTeamPreviewByCategory, getTeamDetail, insertTeam } from "../daos/team.dao";
import { getUserInfoById, userInfoAttributes } from "../daos/user.dao";
import { readTeamDetailResponseDTO } from "../dtos/team.dto";
import { v4 as uuidv4 } from "uuid";
import { CreateTeamSchema } from "../schemas/team.schema";

export const readTeamPreviewsByCategory = async (userId, query) => {
    return await findTeamPreviewByCategory(userId, query.category);
};

export const createTeam = async (userId, body: CreateTeamSchema) => {
    await insertTeam(body, userId, uuidv4());
    return;
};

// export const updateTeam = async (body) => {};

export const readTeamDetail = async (userId, params) => {
    const teamId = params.teamId;
    const detail = await getTeamDetail(teamId);
    const leaderInfo = await getUserInfoById(detail.leaderId);
    const memberInfo = await findMemberInfoByTeamId(teamId, userInfoAttributes);
    return readTeamDetailResponseDTO(detail, leaderInfo, memberInfo, userId == detail.leaderId);
};
