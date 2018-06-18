const shigaFunctions = {}
export let shigaUtils = {}

const register = (type, asyncFunc) => {
  if (typeof type == null) throw new Error('shiga handler can not regist null or undefined type')
  shigaFunctions[type] = (payload) => asyncFunc(payload)
}

export default function createShigaMiddleware() {
  const middleware = ({ dispatch, getState }) => next => action => {
    shigaUtils = { dispatch, getState, next }
    const keys = Object.keys(shigaFunctions)
    if (!keys.includes(action.type)) return next(action)
    next(action)
    shigaFunctions[action.type](action)
  }
  middleware.run = (shigas) => shigas(register)
  return middleware
}

export const dispatch = fsa => Promise.resolve(shigaUtils.dispatch(fsa))
export const getState = (mapState = state => state) => Promise.resolve(shigaUtils.getState())
