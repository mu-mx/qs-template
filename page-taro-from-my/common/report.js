import { umpBiz } from '@base/webmonitor'
import { dataReport } from '@base/report'
import { SPEEDID } from './constants'
import { isPP } from './env'

export function reportUmp(bizid, operation, result, message = '') {
  umpBiz({
    bizid,
    operation,
    result,
    message,
  })
}

const report = dataReport.init()

export function addPtag(ptag = '', eid = '', eparam = {}) {
  if (!ptag && !eid) return

  if (process.env.TARO_ENV == 'h5') {
    if (window.wa) {
      window.wa('jdClick', {
        ...eparam,
        ptag,
      })
      return
    }
  }

  report.click({
    target: ptag, // ptag字段
    eid, // 子午线event_id
    event_param: eparam, //业务自定义参数，业务需要时传入
  })
}

export function addExposure(ptag = '', eid = '', eparam = {}) {
  if (!ptag && !eid) return

  if (process.env.TARO_ENV == 'h5') {
    if (window.wa) {
      window.wa('ptagExposure', {
        ...eparam,
        ptag,
      })
      return
    }
  }

  report.exposure({
    target: ptag, // ptag字段
    eid, // 子午线event_id
    event_param: eparam, //业务自定义参数，业务需要时传入
  })
}

export function addPV() {
  report.pv(
    isPP
      ? {
          page_id: '',
          page_param: {},
          pname: '',
        }
      : { vurl: `http://wq.jd.com/wxapp/pages/...?ptag=` }
  )
}

let reportDone = false
export function speedReport(data) {
  if (reportDone) return

  if (process.env.TARO_ENV === 'weapp') {
    const { TimingReport } = require('@base/timing-report')
    TimingReport.reportAlone(SPEEDID, data)
  } else if (process.env.TARO_ENV === 'h5') {
    window._PFM_TIMING[4] = data.s4
    window._PFM_TIMING[5] = data.s5
    if (window.__SPD_RPT?.report) {
      window.__SPD_RPT.report()
    }
  }
  reportDone = true
}
