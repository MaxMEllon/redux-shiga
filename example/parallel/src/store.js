import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createShigaMiddleware from 'redux-shiga'
import { createLogger } from 'redux-logger'

import rootShiga from './shigas'

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose

const shigaMiddleware = createShigaMiddleware()
const logger = createLogger()

export default (reducer, initialState) => {
  // regist middlewares
  const middlewares = []
  middlewares.push(logger)
  middlewares.push(shigaMiddleware)

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  shigaMiddleware.run(rootShiga)

  return store
}
