export const arrayToTree = (items: any, parentId = "") => {
    // 将平级数据转换为树形菜单结构
    return items
        .filter((item: any) => item.pid === parentId)
        .map((item: any) => ({
            ...item,
            children: arrayToTree(items, item.key),
        }));
};
