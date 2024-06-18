import { useEffect, memo } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

export type ComponentProps = {
  /**
   * props说明
   */
  text: string
}

const Component = ({ text = '默认文案', ...others }) => {
  useEffect(() => {
    // do something
  }, [])

  return (
    <View {...others} className={styles.container}>
      {text}
    </View>
  )
}

/** 组件名称
 * @supported 小程序、H5
 * @see http://legos.wq.jd.com/legosv5/static/docs/jxui/storybook/?path=/story/introduction--page
 */
export const HiTemplate = memo<ComponentProps>(Component)
