interface TeamDetail {
    name: string;
    logo: string | null;
    skillLevel: number | null;
    mannerLevel: number | null;
    description: string | null;
}

interface UserInfo {
    id: number;
    nickname: string;
    height: number | null;
    avatarUrl: string | null;
    Profiles: {
        position: string | null;
    };
}

export const readTeamDetailResponseDTO = (
    detail: TeamDetail,
    leaderInfo: UserInfo,
    membersInfo,
    isTeamLeader: boolean,
) => {
    const member = membersInfo.map((memberInfo) => ({
        id: memberInfo.id,
        avatarUrl: memberInfo.avatarUrl,
        nickname: memberInfo.nickname,
        height: memberInfo.height,
        position: memberInfo["Profiles.position"],
    }));
    return {
        name: detail.name,
        logo: detail.logo,
        skillLevel: detail.skillLevel,
        mannerLevel: detail.mannerLevel,
        description: detail.description,
        participants: {
            leader: {
                id: leaderInfo.id,
                avatarUrl: leaderInfo.avatarUrl,
                nickname: leaderInfo.nickname,
                height: leaderInfo.height,
                position: leaderInfo["Profiles.position"],
            },
            member,
        },
        isTeamLeader,
    };
};
