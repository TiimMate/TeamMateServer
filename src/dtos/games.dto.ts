import { getLevelById } from "../constants/level.constant";
import { getGender } from "../constants/gender.constant";
import { getAgeGroup } from "../constants/age-group.constant";
import { getStatus } from "../constants/status.constant";

export const readGameResponseDTO = (games) => {
    return games.map((game) => ({
        gameTime: game.gameTime,
        teamName: game["HostTeam.name"],
        teamRegion: game["HostTeam.region"],
        teamGender: getGender(game["HostTeam.gender"]),
        memberCount: game.memberCount,
        teamAgeGroup: getAgeGroup(game["HostTeam.ageGroup"]),
        teamSkillLevel: getLevelById(game["HostTeam.skillLevel"]),
        status: getStatus(game.status),
    }));
};

export const readGameDetailResponseDTO = (gameDetail, teamDetail, leaderInfo, memberInfo) => {
    const member = memberInfo.map((info) => ({
        nickname: info["User.nickname"],
        height: info["User.height"],
        position: info["User.Profiles.position"],
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
        },
        member_info: {
            leader: leaderInfo,
            member,
        },
    };
};
