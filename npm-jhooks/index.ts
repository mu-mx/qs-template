import { useRef, useCallback, useMemo } from 'react';

/**
 *
 * @manager 姓名([erp])
 *
 * 组件说明
 *
 * @example 基础用法
 * ```typescript
 * import useHiTemplate from "@jhooks/useHiTemplate";
 *
 * const clickHandler = useHiTemplate('hello');
 * ```
 * @template T 入参的泛型
 * @param param 参数说明
 * @returns 返回值说明
 */
export default function useHiTemplate<T>(param: string): string {
    // do something
    return param
}
