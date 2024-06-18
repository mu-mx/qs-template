import { ComponentMeta, ComponentStory } from '@storybook/react'
import HiTemplate from '../index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'base/HiNpmName 组件名称/在线体验',
  component: HiTemplate,
} as ComponentMeta<typeof HiTemplate>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Story: ComponentStory<typeof HiTemplate> = (args) => (
  <>
    <HiTemplate {...args} />
  </>
)

export const Default = Story.bind({})
Default.args = {}

export const WithText = Story.bind({})
WithText.args = {
  text: '测试文案',
}
