import axios from 'axios'

import * as actions from '../actions'
import {
  dispatch,
  getState,
  put,
  wait,
  tryCatch,
  select,
  steps,
  through,
  END
} from 'redux-shiga'

export default function rootShiga(onAsync) {
  onAsync(actions.fetchGithub1.type, steps([
    through(actions.loadingStart()),
    wait(1000),
    tryCatch((url) => axios.get(url), [
      actions.successFetchGithub,
      actions.handleError,
    ]),
    through(actions.loadingEnd()),
    END,
  ]))

  onAsync(actions.fetchGithub2.type, async (url) => {
    dispatch(actions.loadingStart())
    await wait(1000)()
    try {
      const result = await axios.get(url)
      dispatch(actions.successFetchGithub(result))
    } catch (err) {
      dispatch(actions.handleError(err))
    }
    dispatch(actions.loadingEnd())
    return await END()
  })
}
