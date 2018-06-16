const shigaFunctions = {}
export let shigaUtils = {}

const register = (type, asyncFunc) => {
  shigaFunctions[type] = (payload, next) => asyncFunc(payload).then(fsa => {
    if (typeof fsa !== 'undefined') next(fsa)
  })
}

export default function createShigaMiddleware(shigas) {
  const middleware = ({ dispatch, getState }) => next => action => {
    shigaUtils = { dispatch, getState, next }
    Object.keys(shigaFunctions).forEach(type => {
      if (action.type === type) shigaFunctions[type](action.payload, next)
    })
    next(action)
  }

  middleware.run = (shigas) => shigas(register)

  return middleware
}
