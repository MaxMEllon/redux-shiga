import axios from 'axios'

import * as actions from '../actions'
import { put, wait, tryCatch, select } from 'redux-shiga'

const url = 'https://api.github.com/users/maxmellon'

export default function rootShiga(onAsync) {
  onAsync(actions.fetchGithub.type, async () => {
    await put(actions.loadingStart())
    await wait(3000)
    await tryCatch([() => axios.get(url), actions.successFetchGithub, actions.handleError])
    await put(actions.loadingEnd())
  })
}
