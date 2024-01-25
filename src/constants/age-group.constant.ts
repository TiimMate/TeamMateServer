type AgeGroup = {
    name: string;
};

const AgeGroups: { [key: number]: AgeGroup } = {
    1: { name: "10대" },
    2: { name: "20대" },
    3: { name: "30대" },
    4: { name: "40대" },
    5: { name: "50대 이상~" },
};

export const getAgeGroupsLength = (): number => {
    return Object.keys(AgeGroups).length;
};

export const getAgeGroupById = (id: number): string | undefined => {
    return AgeGroups[id].name;
};
