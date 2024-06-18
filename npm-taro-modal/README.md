# Modal 模态框`@base/hibox-taro-modal`

基于 Taro3 开发的组件

> 适用于需要与用户交互确认的场景



## 安装

```shell
npm install @base/hibox-taro-modal --production --registry=http://registry.m.jd.com
```

## 用法

命令式API 调用
```jsx
import UIModal from '@base/hibox-taro-modal'

export default class Index extends Component {
  componentDidMount() {
    UIModal.show({
      componentId: 'component1',
      title: '测试标题',
      content: '测试内容1<br>测试内容2',
      showCancel: true,
      customContent: (
        <View>
          <Icon className="base-ui-toast_icon" type="warn" size="50" color="#eeeeee" />
          <View>test view</View>
        </View>
      ),
    })
  }

  render() {
    return <UIModal componentId='component1' />
  }
}
```

声明式调用
```jsx
import UIModal from '@base/hibox-taro-modal'

export default class Index extends Component {
  state = {
    modalOptions: {
      title: '测试标题',
      content: '测试内容1<br>测试内容2',
      show: false
    },
  }
  componentDidMount() {
    const { modalOptions } = this.state
    this.setState({
        ...modalOptions,
        show: true
    })
  }

  render() {
    return (
        <UIModal propsData={modalOptions} componentId='component1'>
            测试children
        </UIModal>
    )
  }
}
```

## 配置 & API 说明

### 配置项

| 名称        | 类型     | 默认值 | 说明                                                         |
| ----------- | -------- | ------ | ------------------------------------------------------------ |
| componentId       | String   | ''     | **必填**，组件ID，避免页面存在多个modal的情况，使用命令式API时，需要携传递 `componentId`
| title       | String   | ''     | 标题                                       |
| icon        | String   | ''     | ICON.NONE: 'none', // 不展示icon<br/>ICON.SUCCESS: 'success'<br/>ICON.ERROR: 'error'<br/>ICON.WARN: 'warn'<br/>|
| content     | String   | ''     | 要显示的内容， 支持<br/>换行符|
| customContent| String   | null     | 自定义内容 |
| modalClass  | String   | ''     | modal 类名|
| show  | Boolean   | false     | 展示modal|
| custom  | Boolean   | true     | 是否使用 props.children 自定义modal内容；默认值：true；展示。如果为true，children有传值，使用指令式展示modal会一直展示children内容|
| propsData  | Object  | null   | 声明式props传递的参数对象。{title: '标题', content: '内容'} |
| showCancel  | Boolean  | true   | 是否显示取消按 |
| cancelText  | String   | '取消'   | 取消按钮上的文本|
| confirmText | String   | '确认'   | 确认按钮上的文本|
| closable    | Boolean  | false  | 是否显示关闭按钮（有title的情况下）|
| buttons     | Boolean  | true  | 是否显示底部组合按钮 |
| complete    | function | null   | 点击取消或者确认的回调|
| fail        | function | null   | 点击取消的回调|
| success     | function | null   | 点击确认的回调|
| onClickMask | function | null   | 点击mask的回调|




### 命令式API 说明

#### show(Object:options)

显示通过自定义配置对话框，参见上方配置项

#### hide(componentId)

隐藏组件

```jsx
import UIModal from '@base/hibox-taro-modal'

export default class Index extends Component {
  componentDidMount() {
    UIModal.hide('component1')
  }

  render() {
    return <UIModal componentId='component1' />
  }
}
```
