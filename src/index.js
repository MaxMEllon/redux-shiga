const shigaFunctions = {}
export let shigaUtils = {}

const register = (type, asyncFunc) => {
  if (typeof type == null) throw new Error('shiga handler can not regist null or undefined type')
  if (type in shigaFunctions) throw new Error(`already register ${type} action`)
  shigaFunctions[type] = (payload) => asyncFunc(payload)
}

export default function createShigaMiddleware() {
  const middleware = ({ dispatch, getState }) => next => action => {
    shigaUtils = { dispatch, getState, next }
    const keys = Object.keys(shigaFunctions)
    next(action)
    if (keys.includes(action.type)) {
      return shigaFunctions[action.type](action).catch(err => console.error(err))
    }
  }
  middleware.run = (shigas) => shigas(register)
  return middleware
}

export const dispatch = fsa => Promise.resolve(shigaUtils.dispatch(fsa))
export const getState = (mapState = state => state) => {
  if (typeof mapState !== 'function') {
    throw new Error('A getState of shiga expected arguments as function')
  }
  return Promise.resolve(mapState(shigaUtils.getState()))
}
