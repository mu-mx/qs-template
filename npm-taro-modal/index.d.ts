import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

export interface XModalOptions {
    /**
     * 建议填写，组件ID，避免页面存在多个modal的情况
     */
    componentId?: string
    /**
     * 元素的标题，建议最多十一个字
     */
    title?: string
    /**
     * modal样式className
     */
    modalClass?: string
    /**
     * 要显示的内容
     */
    content?: React.ReactNode
    /**
     * 自定义内容
     */
    customContent?: React.ReactNode
    children?: React.ReactNode
    /**
     * 是否使用 props.children 自定义modal内容；默认值：true；展示。如果为true，children有传值，使用指令式展示modal会一直展示children内容
     */
    custom?: boolean
    /**
     * 是否显示取消按钮；默认值：true
     */
    showCancel?: boolean
    /**
     * 取消按钮的文本，建议四个汉字；默认值：'取消'
     */
    cancelText?: string
    /**
     * 确认按钮的文本，建议四个汉字；默认值：'确定'
     */
    confirmText?: string
    /**
     * 是否显示该组件；默认值：false
     */
    show?: boolean
    /**
     * 是否显示关闭按钮；默认值：false
     */
    closable?: boolean

    /**
     * icon 类型；默认值：'none'。
     * ICON.NONE: 'none', // 不展示icon
     * ICON.SUCCESS: 'success'
     * ICON.ERROR: 'error'
     * ICON.WARN: 'warn'
     */
    icon?: string
    /**
     * 是否显示组合按钮；默认值：true
     */
    buttons?: boolean
    /**
     * 点击取消或确认按钮触发的事件
     */
    complete?: CommonEventFunction
    /**
     * 点击取消按钮触发的事件
     */
    fail?: CommonEventFunction
    /**
     * 点击确认按钮触发的事件
     */
    success?: CommonEventFunction
    /**
     * 点击mask触发的事件
     */
    onClickMask?: CommonEventFunction
}

export interface XModalProps {
    /**
     * 必填，组件ID，避免页面存在多个modal的情况
     */
    componentId: string
    /**
     * 声明式props传递的参数对象。{title: '标题', content: '内容'}
     */
    propsData?: XModalOptions
    children?: React.ReactNode
}

export interface XModalComponent extends ComponentClass<XModalProps> {
    show: (options: XModalOptions) => void
    hide: () => void
    ICON: {
        NONE: 'none'
        SUCCESS: 'success'
        ERROR: 'error'
        WARN: 'warn'
    }
}

declare const XModal: XModalComponent

export default XModal
