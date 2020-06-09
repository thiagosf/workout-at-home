import {
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// const persistedState = loadState()
const persistedState = {
  exercise: {
    data: null,
    list: [],
    loading: false,
    selectedMuscleGroup: null,
    selectedEquipaments: [],
    selectedExercises: [1, 2]
  }
}
const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(thunk))
)

export default store
