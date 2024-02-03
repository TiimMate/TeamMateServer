import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";
import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface ReadGuest {
    gameTime: string;
    memberCount: number | null;
    recruitCount: number | null;
    Team: {
        name: string;
        region: string | null;
        gender: Gender;
        ageGroup: AgeGroup;
        skillLevel: number;
    };
}

interface GuestDetail {
    gameTime: string;
    description: string | null;
    memberCount: number | null;
    recruitCount: number | null;
}

interface TeamDetail {
    name: string;
    logo: string | null;
    mannerLevel: number | null;
    description: string | null;
    gender: Gender;
    ageGroup: AgeGroup;
    skillLevel: number;
    gymName: string | null;
}

interface UserInfo {
    nickname: string;
    height: number | null;
    Profiles: {
        position: string | null;
    };
}

export const readGuestingResponseDTO = (guesting: ReadGuest) => {
    return {
        gameTime: guesting.gameTime,
        teamName: guesting["Team.name"],
        teamRegion: guesting["Team.region"],
        teamGender: getTeamGender(guesting["Team.gender"]),
        memberCount: guesting.memberCount,
        teamAgeGroup: getAgeGroup(guesting["Team.ageGroup"]),
        teamSkillLevel: getLevelById(guesting["Team.skillLevel"]),
        recruitCount: guesting.recruitCount,
    };
};

export const readGuestingDetailResponseDTO = (
    guestingDetail: GuestDetail,
    TeamDetail: TeamDetail,
    leaderInfo: UserInfo,
    memberInfo: UserInfo[],
) => {
    const member = memberInfo.map((info: UserInfo) => ({
        nickname: info.nickname,
        height: info.height,
        position: info["Profiles.position"],
    }));
    return {
        name: TeamDetail.name,
        skillLevel: TeamDetail.skillLevel,
        mannerLevel: TeamDetail.mannerLevel,
        description: TeamDetail.description,
        gusting_info: {
            gameTime: guestingDetail.gameTime,
            gender: getTeamGender(TeamDetail.gender),
            ageGroup: getAgeGroup(TeamDetail.ageGroup),
            gymName: TeamDetail.gymName,
            skillLevel: getLevelById(TeamDetail.skillLevel),
        },
        member_info: {
            leader: {
                nickname: leaderInfo.nickname,
                height: leaderInfo.height,
                position: leaderInfo["Profiles.position"],
            },
            member,
        },
    };
};
