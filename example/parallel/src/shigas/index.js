import axios from 'axios'
import delay from 'delay'
import { dispatch } from 'redux-shiga'

import * as actions from '../actions'

const fetch = axios.create({
  baseURL: 'https://api.github.com',
})

const fetchGithubUserInfoByUserName = async (username) => {
  try {
    const result = await fetch.get(`/users/${username}`)
    await dispatch(actions.successFetchGithubUserInfo(result.data))
  } catch (err) {
    await dispatch(actions.handleError(err))
  }
}

const fetchGithubUserOrgsInfoByUserName = async (username) => {
  try {
    const result = await fetch.get(`/users/${username}/orgs`)
    await dispatch(actions.successFetchGithubUserOrgsInfo(result.data))
  } catch (err) {
    await dispatch(actions.handleError(err))
  }
}

export default function rootShiga(onAsync) {
  onAsync(actions.pararellFetchGithubSomeInfo.type, async (action) => {
    await dispatch(actions.loadingStart())
    await delay(1000)
    await Promise.all([
      fetchGithubUserInfoByUserName(action.payload),
      fetchGithubUserOrgsInfoByUserName(action.payload),
    ])
    await dispatch(actions.loadingEnd())
  })
}
