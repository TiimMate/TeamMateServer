import { getAgeGroup } from "../constants/age-group.constant";
import { getGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";

export const readGuestingResponseDTO = (guestings) => {
    return guestings.map((guesting) => ({
        gameTime: guesting.gameTime,
        teamName: guesting["Team.name"],
        teamRegion: guesting["Team.region"],
        teamGender: getGender(guesting["Team.gender"]),
        memberCount: guesting.memberCount,
        teamAgeGroup: getAgeGroup(guesting["Team.ageGroup"]),
        teamSkillLevel: getLevelById(guesting["Team.skillLevel"]),
        recruitCount: guesting.recruitCount,
    }));
};

export const readGuestingDetailResponseDTO = (guestingDetail, TeamDetail, leaderInfo, memberInfo) => {
    const member = memberInfo.map((info) => ({
        nickname: info["User.nickname"],
        height: null,
        weight: null,
        position: null,
    }));
    return {
        name: TeamDetail.name,
        skillLevel: TeamDetail.skillLevel,
        mannerLevel: TeamDetail.mannerLevel,
        description: TeamDetail.description,
        gusting_info: {
            gameTime: guestingDetail.gameTime,
            gender: getGender(TeamDetail.gender),
            ageGroup: getAgeGroup(TeamDetail.ageGroup),
            gymName: TeamDetail.gymName,
            skillLevel: getLevelById(TeamDetail.skillLevel),
        },
        member_info: {
            leader: leaderInfo,
            member,
        },
    };
};
