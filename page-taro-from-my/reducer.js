import * as Actions from './actions'

export function reducer(state, action) {
  switch (action.type) {
    case Actions.INIT_PAGE:
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}
