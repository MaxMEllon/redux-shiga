const creator = (type) => {
  const fsa = payload => ({ type, payload })
  fsa.type = type
  return fsa
}

export const fetchGithub = creator('fetch github')
export const successFetchGithub = creator('success fetch github')
export const handleError = creator('handle error')

export const loadingStart = creator('start loading')
export const loadingEnd = creator('end loading')
