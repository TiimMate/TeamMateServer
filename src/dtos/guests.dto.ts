import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getLevelById } from "../constants/level.constant";
import { getStatus } from "../constants/status.constant";
import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface GuestDetail {
    gameTime: string;
    description: string | null;
    memberCount: number | null;
    recruitCount: number | null;
    gameDuration: string;
    status: number;
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

export const readGuestingResponseDTO = (result) => {
    return {
        guests: result.guests.map((guesting) => ({
            gameTime: guesting.gameTime,
            gameDuration: guesting.gameDuration,
            teamName: guesting["Team.name"],
            teamRegion: guesting["Team.region"],
            teamGender: getTeamGender(guesting["Team.gender"]),
            memberCount: guesting.memberCount,
            teamAgeGroup: getAgeGroup(guesting["Team.ageGroup"]),
            teamSkillLevel: getLevelById(guesting["Team.skillLevel"]),
            recruitCount: guesting.recruitCount,
            status: getStatus(guesting.status),
        })),
        hasNext: result.hasNext,
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
        status: getStatus(guestingDetail.status),
        gusting_info: {
            gameTime: guestingDetail.gameTime,
            gameDuration: guestingDetail.gameDuration,
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
