const creator = (type) => {
  const fsa = payload => ({ type, payload })
  fsa.type = type
  return fsa
}

export const fetchGithub1 = creator('fetch github 1')
export const fetchGithub2 = creator('fetch github 2')

export const reset = creator('reset')

export const successFetchGithub = creator('success fetch github')
export const handleError = creator('handle error')

export const loadingStart = creator('start loading')
export const loadingEnd = creator('end loading')
