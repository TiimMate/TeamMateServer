import { getLevelById } from "../constants/level.constant";

//TODO: getGender, getAgeGroup 함수 사용

export const readGameResponseDTO = (games) => {
    return games.map((game) => ({
        gameTime: game.gameTime,
        teamName: game["HostTeam.name"],
        teamRegion: game["HostTeam.region"],
        teamGender: game["HostTeam.gender"],
        memberCount: game.memberCount,
        teamAgeGroup: game["HostTeam.ageGroup"],
        teamSkillLevel: getLevelById(game["HostTeam.skillLevel"]),
        status: game.status,
    }));
};

export const readGameDetailResponseDTO = (gameDetail, teamDetail, leaderInfo, memberInfo) => {
    const member = memberInfo.map((info) => ({
        nickname: info["User.nickname"],
        // height: null,
        // weight: null,
        // position: null,
    }));
    return {
        name: teamDetail.name,
        skillLevel: teamDetail.skillLevel,
        mannerLevel: teamDetail.mannerLevel,
        description: teamDetail.description,
        game_info: {
            gymName: teamDetail.gymName,
            gameTime: gameDetail.gameTime,
            gender: teamDetail.gender,
            ageGroup: teamDetail.ageGroup,
            skillLevel: teamDetail.skillLevel,
        },
        member_info: {
            leader: leaderInfo,
            member,
        },
    };
};
