import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readMatchingResponseDTO = (matchings) => {
    return matchings.map((matching) => ({
        gameTime: matching.gameTime,
        teamName: matching["Team.name"],
        teamRegion: matching["Team.region"],
        teamGender: getTeamGender(matching["Team.gender"]),
        memberCount: matching.memberCount,
        teamAgeGroup: getAgeGroup(matching["Team.ageGroup"]),
        teamSkillLevel: getLevelById(matching["Team.skillLevel"]),
    }));
};
