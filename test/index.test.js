import createShigaMiddleware, { put, wait, tryCatch, select } from '../src'

const GIVE_ME_META = 'GIVE_ME_META'

function noop() { }

function metaMiddleware() {
  return next => action =>
    action.type === GIVE_ME_META
      ? next({ ...action })
      : next(action)
}

describe('createShigaMiddleware', () => {
  let baseDispatch
  let dispatch
  let middleware

  beforeEach(() => {
    middleware = createShigaMiddleware()
    baseDispatch = jest.fn()
    dispatch = (action) => {
      const methods = { dispatch, getState: noop }
      return metaMiddleware()(middleware(methods)(baseDispatch))(action)
    }
  })

  it('handles Flux standard actions', (done) => {
    middleware.run((onAsync) => {
      onAsync('ACTION_TYPE', async (payload) => {
        expect(payload).toEqual(1)
        done()
      })
      dispatch({ type: 'ACTION_TYPE', payload: 1 })
    })
  })
})
