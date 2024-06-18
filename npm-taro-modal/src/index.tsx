import classNames from 'classnames'
import React, { useEffect, useState, useMemo, memo } from 'react'
import { View, Block } from '@tarojs/components'
import Taro, { Events, getCurrentInstance, eventCenter } from '@tarojs/taro'

import { XModalProps, XModalOptions } from '../index'

import './index.scss'

const events = new Events()
const $instance = getCurrentInstance()
let currentWebviewId = ''
// 默认配置
const defaultOptions = {
    modalClass: '',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确定',
    buttons: true,
    closable: true,
    custom: true
}
// 弹窗icon
const MODAL_ICON = {
    NONE: 'none',
    SUCCESS: 'success',
    ERROR: 'error',
    WARN: 'warn'
}

interface UIModalCompProps {
    data: XModalOptions
    children?: any
}
// 弹窗组件
const UIModalComp = memo(({ data, children }: UIModalCompProps) => {
    const [options, setOptions] = useState<XModalOptions>(data)
    const [visible, setVisible] = useState(false)
    const {
        title,
        modalClass,
        content,
        customContent,
        showCancel,
        cancelText,
        confirmText,
        show,
        complete,
        custom,
        fail,
        success,
        onClickMask,
        closable,
        icon,
        buttons
    } = options

    // @ts-ignore
    const wxWebviewId = $instance?.page?.__wxWebviewId__ || ''
    currentWebviewId = wxWebviewId

    // content 切割 <br> 后得到的文本数组
    const [contentArray, setContentArray] = useState<any>(null)

    //  处理content换行、首尾空白等
    const disposeContent = _content => {
        if (_content && _content.indexOf('<br>') > 0) {
            const contentArr = _content.split('<br>')
            // 去除首尾空白字符
            contentArr.forEach(item => {
                return item.trim()
            })
            setContentArray(contentArr)
        }
    }

    useEffect(() => {
        // 因为 Taro 的 getCurrentInstance() 会在 onHide 的时候将 router、page 设为null，
        // 所以需要每次 onShow 的时候更新记录下当前 page 的 webviewId
        // 监听page的onshow
        const onShowEventId = $instance?.router?.onShow
        onShowEventId && eventCenter.on(onShowEventId, onPageShow)

        return () => {
            onShowEventId && eventCenter.off(onShowEventId, onPageShow)
        }
    }, [])

    useEffect(() => {
        disposeContent(options.content)
    }, [options.content])

    // props更新
    useEffect(() => {
        setOptions({
            ...defaultOptions,
            ...data
        })
        setVisible(data.show as boolean)
    }, [data])

    const rootCls = 'base-hibox-taro-modal'
    const rootClassName = classNames(rootCls, modalClass)

    const _show = (opts: XModalOptions) => {
        if (opts) {
            setOptions({
                ...defaultOptions,
                ...opts
            })
        }
        setVisible(true)
    }

    const _hide = () => {
        setVisible(false)
    }

    const modalCancel = e => {
        _hide()
        fail && fail(e)
        complete && complete(e)
    }

    const modalConfirm = e => {
        _hide()
        success && success(e)
        complete && complete(e)
    }

    useEffect(() => {
        events.on(wxWebviewId + 'base-hibox-taro-modal_show' + data.componentId, _show)
        events.on(wxWebviewId + 'base-hibox-taro-modal_hide' + data.componentId, _hide)

        return () => {
            events.off(wxWebviewId + 'base-hibox-taro-modal_show' + data.componentId)
            events.off(wxWebviewId + 'base-hibox-taro-modal_hide' + data.componentId)
        }
    }, [data.componentId])

    const onPageShow = () => {
        currentWebviewId = wxWebviewId
    }

    return (
        <View
            className={`${rootClassName} ${visible ? rootCls + '--show' : ''}`}
        >
            <View className={`${rootCls}__mask`} onClick={onClickMask}></View>
            <View className={`${rootCls}__container`}>
                {title && (
                    <View
                        className={`${rootCls}__header ${
                            closable ? rootCls + '__header--closable' : ''
                        }`}
                    >
                        <View
                            className={`${rootCls}__header__title`}
                            style={
                                closable && title.length >= 10
                                    ? `padding-right: ${Taro.pxTransform(50)}`
                                    : ''
                            }
                        >
                            {title}
                        </View>
                        <View
                            className={`${rootCls}__header__close`}
                            onClick={modalCancel}
                        ></View>
                    </View>
                )}

                <View className={`${rootCls}__content`}>
                    {customContent}
                    {custom && children}
                    {content && (
                        <Block>
                            {icon && icon != MODAL_ICON.NONE && (
                                <View
                                    className={`${rootCls}__content__icon ${icon}`}
                                ></View>
                            )}
                            <View className={`${rootCls}__content__one`}>
                                {(contentArray &&
                                    contentArray.map(text => (
                                        <View key={text}>{text}</View>
                                    ))) ||
                                    content}
                            </View>
                        </Block>
                    )}
                </View>

                {buttons && (
                    <View className={`${rootCls}__footer`}>
                        <View className={`${rootCls}__actions`}>
                            {showCancel && (
                                <View
                                    className="ui-button default"
                                    onClick={modalCancel}
                                >
                                    {cancelText}
                                </View>
                            )}
                            <View
                                className="ui-button primary"
                                onClick={modalConfirm}
                            >
                                {confirmText}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
})
// 弹窗调用
const UIModal = (props: XModalProps) => {
    const { propsData, children, componentId } = props
    const data = useMemo(() => {
        const opts = {
            ...defaultOptions,
            ...propsData,
            componentId
        }
        !componentId && console.warn('请通过props.componentId绑定hibox-taro-modal组件')
        return {
            ...opts
        }
    }, [propsData])

    return <UIModalComp data={data}>{children}</UIModalComp>
}
// 提供show方法
UIModal.show = (options: XModalProps = { componentId: '' }) => {
    // @ts-ignore
    const wxWebviewId = $instance?.page?.__wxWebviewId__ || currentWebviewId || ''
    const eventName = wxWebviewId + 'base-hibox-taro-modal_show' + options.componentId
    !options.componentId && console.warn('请传递hibox-taro-modal组件componentId')
    // @ts-ignore
    delete options.componentId
    setTimeout(() => {
        events.trigger(eventName, options)
    }, 0)
}
// 提供hide方法
UIModal.hide = (componentId = '') => {
    // @ts-ignore
    const wxWebviewId = $instance?.page?.__wxWebviewId__ || currentWebviewId || ''
    setTimeout(() => {
        events.trigger(wxWebviewId + 'base-hibox-taro-modal_hide' + componentId)
    }, 0)
}

UIModal.ICON = MODAL_ICON

export default UIModal
