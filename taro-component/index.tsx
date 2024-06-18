import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

function TaroComp(props) {

  React.useEffect(() => {
    console.log('Comp useEffect.')
  })

  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  )
}

export default React.memo(TaroComp)