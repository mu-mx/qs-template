import { ComponentClass } from 'react'

export interface ComponentProps {
  /**
   * props说明
   */
   text: string
  /**
   * 同一页面若需要多个组件实例，则需要指定ID
   */
   compId?: string
}

export interface ComponentApiParams {
  /**
   * params说明
   */
   text: string
   /**
    * 指定需要触发的组件ID
    */
   compId?: string
}

export interface ComponentApi extends ComponentClass<ComponentProps> {
    handleSomething: (options: ComponentApiParams) => void
}

declare const HiTemplate: ComponentApi

export default HiTemplate
