// 角色状态类型
export enum UserStatusType {
    Open = 1,
    Disable = 2,
}

// 角色状态 与中文的映射关系
export const UserStatusCnMap = {
    [UserStatusType.Open]: "生效中",
    [UserStatusType.Disable]: "已离职",
};

// 角色状态 protable  下拉选项
export const UserStatusValueEnum = {
    [UserStatusType.Open]: { text: "生效中" },
    [UserStatusType.Disable]: { text: "已离职" },
};

// 角色状态 下拉选项数据
export const UserStatusOptions = Object.keys(UserStatusType).map((key: any) => ({
    value: key,
    label: UserStatusCnMap[key as UserStatusType],
}));
