const creator = (type) => {
  const fsa = payload => ({ type, payload })
  fsa.type = type
  return fsa
}

export const pararellFetchGithubSomeInfo = creator('pararell fetch github some info')

export const fetchGithubUserInfo = creator('fetch github user info')
export const successFetchGithubUserInfo = creator('success fetch github user info')

export const fetchGithubUserOrgsInfo = creator('fetch github orgs info')
export const successFetchGithubUserOrgsInfo = creator('success fetch github orgs info')

export const reset = creator('reset')

export const handleError = creator('handle error')

export const loadingStart = creator('start loading')
export const loadingEnd = creator('end loading')
