import {
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import syncStorage from './sync_storage'

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
)

store.subscribe(syncStorage(store))

export default store
