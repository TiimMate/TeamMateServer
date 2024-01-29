import { getAgeGroupById } from "../constants/age-group.constant";
import { getGenderById } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readGameResponseDTO = (games) => {
    return games.map((game) => ({
        gameTime: game.gameTime,
        teamName: game["HostTeam.name"],
        teamRegion: game["HostTeam.region"],
        teamGender: getGenderById(game["HostTeam.gender"]),
        memberCount: game.memberCount,
        teamAgeGroup: getAgeGroupById(game["HostTeam.ageGroup"]),
        teamSkillLevel: getLevelById(game["HostTeam.skillLevel"]),
        status: game.status,
    }));
};
