import { TaroPage } from '@biz/taro-page'
import App from './app'
import { addPV, SPEEDID } from './common/index'

// 页面使用class组件是为了接入基类
class Index extends TaroPage {
  config = {
    speedId: SPEEDID,
    manualPVReport: true,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidShow() {
    /* #IF(TARO_ENV!=='h5') */
    addPV()
    /* #IFEND */
  }

  render() {
    return <App page={this} />
  }
}

export default Index
