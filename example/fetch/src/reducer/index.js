import * as actions from '../actions'

export const initialState = {
  github: null,
  loading: false,
}

export default function reducer(state, action) {
  if (typeof state === 'undefined') return initialState

  switch (action.type) {
    case actions.successFetchGithub.type:
      return Object.assign({}, state, { github: action.payload.data })
    case actions.handleError.type:
      window.alert(action.payload.message)
      return state
    case actions.loadingStart.type:
      return Object.assign({}, state, { loading: true })
    case actions.loadingEnd.type:
      return Object.assign({}, state, { loading: false })
    default:
      return state
  }
}
