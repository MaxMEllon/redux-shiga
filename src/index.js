import { put, tryCatch, wait, select } from './effects'

const shigaFunctions = {}
export let shigaUtils = {}

const register = (type, asyncFunc) => {
  if (typeof type == null) throw new Error('shiga handler can not regist null or undefined type')
  shigaFunctions[type] = (payload, next) => asyncFunc(payload).then(fsa => {
    if (typeof fsa !== 'undefined') next(fsa)
  })
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
  put,
  tryCatch,
  wait,
  select,
}
