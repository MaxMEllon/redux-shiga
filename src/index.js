import { dispatch, getState, put, tryCatch, wait, select, steps, through, END } from './effects'

const shigaFunctions = {}
export let shigaUtils = {}

const register = (type, asyncFunc) => {
  if (typeof type == null) throw new Error('shiga handler can not regist null or undefined type')
  shigaFunctions[type] = (payload, next) => asyncFunc(payload).then(res => next(res))
}

export default function createShigaMiddleware() {
  const middleware = ({ dispatch, getState }) => next => action => {
    shigaUtils = { dispatch, getState, next }
    const keys = Object.keys(shigaFunctions)
    if (!keys.includes(action.type)) return next(action)
    shigaFunctions[action.type](action.payload, next)
  }
  middleware.run = (shigas) => shigas(register)
  return middleware
}

export {
  dispatch,
  getState,
  put,
  tryCatch,
  wait,
  select,
  steps,
  through,
  END,
}
