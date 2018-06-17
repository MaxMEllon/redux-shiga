import axios from 'axios'
import delay from 'delay'

import * as actions from '../actions'
import { dispatch } from 'redux-shiga'

export default function rootShiga(onAsync) {
  onAsync(actions.fetchGithub.type, async (url) => {
    await dispatch(actions.loadingStart())
    await delay(1000)
    try {
      const result = await axios.get(url)
      await dispatch(actions.successFetchGithub(result))
    } catch (err) {
      await dispatch(actions.handleError(err))
    }
    await dispatch(actions.loadingEnd())
  })
}
