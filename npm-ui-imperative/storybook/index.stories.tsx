import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '../../../.storybook/introduction/components/button/Button'
import HiTemplate from '../index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'base/HiNpmName 组件名称/在线体验',
  component: HiTemplate,
} as ComponentMeta<typeof HiTemplate>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Story: ComponentStory<typeof HiTemplate> = (args) => (
  <>
    <Button
      label="点击触发API"
      primary
      onClick={() => {
        HiTemplate.handleSomething({
          ...args,
          text: 'API调用成功',
        })
      }}
    ></Button>
    <HiTemplate {...args} />
  </>
)

export const Default = Story.bind({})
Default.args = {
  compId: 'Default',
}

export const WithText = Story.bind({})
WithText.args = {
  compId: 'WithText',
  text: '默认文案',
}
