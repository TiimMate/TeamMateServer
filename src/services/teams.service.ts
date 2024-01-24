import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { getTeamPreviewByCategory } from "../daos/team.dao";
// import { insertTeam } from "../daos/team.dao";
// import { CreateTeamInput } from "../schemas/team.schema";
// import { insertTeam } from "../daos/team.dao";

export const readTeamPreviewsByCategory = async (userId, params) => {
    return await getTeamPreviewByCategory(userId, params.category);
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
