import * as actions from '../actions'

export const initialState = {
  user: null,
  orgs: null,
  loading: false,
}

export default function reducer(state, action) {
  if (typeof state === 'undefined') return initialState

  switch (action.type) {
    case actions.successFetchGithubUserInfo.type:
      return Object.assign({}, state, { user: action.payload })
    case actions.successFetchGithubUserOrgsInfo.type:
      return Object.assign({}, state, { orgs: action.payload })
    case actions.reset.type:
      return Object.assign({}, state, initialState)
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
