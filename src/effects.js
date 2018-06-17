import { shigaUtils } from './index'

export const dispatch = (fsa) => shigaUtils.dispatch(fsa)

export const getState = () => shigaUtils.getState()

export const wait = (duration) => (payload) => {
  return new Promise(resolve => setTimeout(() => resolve(payload), duration))
}

export const put = (action) => (payload) => {
  return Promise.resolve(shigaUtils.next(action(payload)))
}

export const through = (fsa) => (payload) => {
  shigaUtils.dispatch(fsa)
  return Promise.resolve(payload)
}

export const select = (mapStateToProps = state => state) => () => {
  return Promise.resolve(mapStateToProps(shigaUtils.getState()))
}

export const steps = (asyncFuncList) => async (payload) => {
  return await asyncFuncList.reduce(async (acc, cur) => await cur(await acc), payload)
}

export const END = () => ({
  type: 'steps END',
  meta: '@@redux-shiga/action',
})

export const If = ([truth, falsehood]) => async (payload, condition) => {
  if (condition) {
    await put(truth)(payload)
  } else {
    await put(falsehood)(payload)
  }
}

export const tryCatch = (asyncFunc, [success, fail]) => async (payload) => {
  try {
    const result = await asyncFunc(payload)
    await put(success)(result)
    return true
  } catch (err) {
    await put(fail)(err)
    return false
  }
}

