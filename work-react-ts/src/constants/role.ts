// 角色状态类型
export enum RoleStatusType {
    Open = 1,
    Disable = 2,
}

// 角色状态 与中文的映射关系
export const RoleStatusCnMap = {
    [RoleStatusType.Open]: "启用",
    [RoleStatusType.Disable]: "禁用",
};

// 角色状态 protable  下拉选项
export const RoleStatusValueEnum = {
    [RoleStatusType.Open]: { text: "启用中" },
    [RoleStatusType.Disable]: { text: "禁用中" },
};

// 角色状态 下拉选项数据
export const roleStatusOptions = Object.keys(RoleStatusType).map((key: any) => ({
    value: key,
    label: RoleStatusCnMap[key as RoleStatusType],
}));
