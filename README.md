# redux-shiga

## example

- action

```javascript
const creator = (type) => {
  const fsa = payload => ({ type, payload })
  fsa.type = type
  return fsa
}

export const countUpAsync = creator('count up async')
export const countDownAsync = creator('count down async')
export const changeCount = creator('change count')
```

- reducer

```javascript
import * as actions from '../actions'

export const initialState = {
  count: 0,
}

export default function reducer(state, action) {
  if (typeof state === 'undefined') return initialState

  switch (action.type) {
    case actions.changeCount.type:
      return Object.assign({}, state, { count: state.count + action.payload })
    default:
      return state
  }
}
```

- store

```javascript
import { applyMiddleware, compose, createStore } from 'redux'
import createShigaMiddleware from 'redux-shiga'

import rootShiga from './shigas'


export default (reducer, initialState) => {
  // regist middlewares
  const middlewares = []
  const shigaMiddleware = createShigaMiddleware()
  middlewares.push(shigaMiddleware)

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  )

  shigaMiddleware.run(rootShiga)

  return store
}
```

- shiga

```javascript
import { put, wait } from 'redux-shiga'

import * as actions from '../actions'

export default function rootShiga(onAsync) {
  onAsync(actions.countUpAsync.type, async () => {
    await wait(1000)
    await put(actions.changeCount(1))
  })

  onAsync(actions.countDownAsync.type, async () => {
    await wait(1000)
    await put(actions.changeCount(-1))
  })
}
```

- component

```javascript
import React from 'react'
import { connect } from 'react-redux'

import { countUpAsync, countDownAsync } from '../actions'

const App = ({ count, countUpAsync, countDownAsync }) => (
  return (
    <React.Fragment>
      <div>{count}</div>
      <button onClick={() => countUpAsync()}>countUpAsync</button>
      <button onClick={() => countDownAsync()}>countDownAsync</button>
    </React.Fragment>
  )
)

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToActions = {
  countUpAsync,
  countDownAsync,
}

export default App |> connect(mapStateToProps, mapDispatchToActions)
```
