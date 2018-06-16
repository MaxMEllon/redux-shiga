import { shigaUtils } from './index.js'

export const wait = (duration) => {
  return new Promise(resolve => setTimeout(() => resolve(), duration))
}

export const put = (fsa) => {
  return Promise.resolve(shigaUtils.dispatch(fsa))
}

export const select = (mapStateToProps = state => state) => {
  return Promise.resolve(mapStateToProps(shigaUtils.getState()))
}

export const tryCatch = async ([asyncFunc, success, fail]) => {
  try {
    const result = await asyncFunc()
    await put(success(result))
    return true
  } catch (err) {
    await put(fail(err))
    return false
  }
}

