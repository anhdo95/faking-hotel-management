import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '@/redux'

export const history = createBrowserHistory()

const middleware = routerMiddleware(history)

const store: any = createStore(rootReducer, applyMiddleware(middleware))

if (process.env.NODE_ENV === 'development') {
  (global as any)._store = store
}

export default store
