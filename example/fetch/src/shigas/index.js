import axios from 'axios'
import delay from 'delay'

import * as actions from '../actions'
import { dispatch } from 'redux-shiga'

export default function rootShiga(onAsync) {
  onAsync(actions.fetchGithub.type, async (action) => {
    const { payload } = action
    await dispatch(actions.loadingStart())
    await delay(1000)
    try {
      const result = await axios.get(payload)
      await dispatch(actions.successFetchGithub(result))
    } catch (err) {
      await dispatch(actions.handleError(err))
    }
    await dispatch(actions.loadingEnd())
  })
}
