import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { findMemberInfoByTeamId } from "../daos/member.dao";
import { findTeamPreviewByCategory, getTeamDetail } from "../daos/team.dao";
import { getUserInfoById, userInfoAttributes } from "../daos/user.dao";
import { readTeamDetailResponseDTO } from "../dtos/team.dto";
// import { insertTeam } from "../daos/team.dao";
// import { CreateTeamInput } from "../schemas/team.schema";
// import { insertTeam } from "../daos/team.dao";

export const readTeamPreviewsByCategory = async (userId, query) => {
    return await findTeamPreviewByCategory(userId, query.category);
};

// export const createTeam = async (body: CreateTeamInput) => {
//     // //사진 gcs에 업로드 => 파일 경로 가져오기
//     console.log(body.logo);
//     throw new Error();
//     const result = await insertTeam(body);
//     //console.log(result);
//     //return result;
//     // return;
// };

export const readTeamDetail = async (userId, params) => {
    const teamId = params.teamId;
    const detail = await getTeamDetail(teamId);
    const leaderInfo = await getUserInfoById(detail.leaderId);
    const memberInfo = await findMemberInfoByTeamId(teamId, userInfoAttributes);
    return readTeamDetailResponseDTO(detail, leaderInfo, memberInfo, userId == detail.leaderId);
};
