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

  it('put effect', (done) => {
    middleware.run((onAsync) => {
      onAsync('ACTION_TYPE', async (payload) => {
        await put({ type: 'GIVE_ME_META', payload: payload + 2 })
      })

      onAsync('GIVE_ME_META', async (payload) => {
        expect(payload).toEqual(3)
        done()
      })
      dispatch({ type: 'ACTION_TYPE', payload: 1 })
    })
  })

  it('wait effect', (done) => {
    middleware.run((onAsync) => {
      onAsync('ACTION_TYPE', async (payload) => {
        await wait(1000)
        await put({ type: 'GIVE_ME_META', payload: payload + 2 })
      })

      onAsync('GIVE_ME_META', async (payload) => {
        expect(payload).toEqual(3)
        done()
      })
      dispatch({ type: 'ACTION_TYPE', payload: 1 })
    })
  })

  it('tryCatch effect', (done) => {
    middleware.run((onAsync) => {
      onAsync('ACTION_TYPE_1', async (payload) => {
        await tryCatch([
          () => Promise.resolve(payload + 2),
          (payload) => ({ type: 'success', payload }),
          (payload) => ({ type: 'fail', payload }),
        ])
      })

      onAsync('success', async (payload) => {
        expect(payload).toEqual(3)
        done()
      })

      dispatch({ type: 'ACTION_TYPE_1', payload: 1 })
    })
  })

  it('select effect', async () => {
    const result = await select()
    expect(result).toEqual(undefined)
  })
})
