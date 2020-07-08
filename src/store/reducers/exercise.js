import { uuid } from '../../utils'

const initialState = {
  data: null,
  list: [],
  loading: false,
  selectedMuscleGroup: null,
  selectedEquipaments: [],
  selectedExercises: [],
  rest: 30,
  workoutStartTime: null,
  workoutEndTime: null,
  cycles: 1,
  currentIndexExercise: 0,
  workouts: [],
  workoutListName: null,
  savedWorkoutLists: []
}

const identifier = 'exercise'

export default (state = initialState, action) => {
  let nextState = { ...state }

  switch (action.type) {
    case 'BEFORE_SEND':
      if (action.identifier === identifier) {
        nextState.loading = true
      }
      break

    case 'AFTER_RESPONSE':
      if (action.identifier === identifier) {
        nextState.loading = false
      }
      break

    case 'SET_EXERCISES':
      nextState.list = action.data
      break

    case 'FILTER_MUSCLE_GROUP':
      nextState.selectedMuscleGroup = action.data
      break

    case 'FILTER_EQUIPAMENTS':
      nextState.selectedEquipaments = action.data
      break

    case 'ADD_EXERCISE': {
      let selectedExercises = [...nextState.selectedExercises]
      const ids = selectedExercises.map(item => +item.exercise_id)
      if (Array.isArray(action.data)) {
        selectedExercises = action.data
      } else {
        if (ids.includes(+action.exercise_id)) {
          selectedExercises = selectedExercises.map(item => {
            if (+item.exercise_id === +action.exercise_id) {
              item = { ...action.data }
            }
            return item
          })
        } else {
          selectedExercises.push({
            ...action.data,
            sort: selectedExercises.length
          })
        }
      }
      nextState.selectedExercises = selectedExercises
      break
    }

    case 'REMOVE_EXERCISE': {
      nextState.selectedExercises = nextState.selectedExercises.filter(item => {
        return +item.exercise_id !== +action.data
      })
      break
    }

    case 'REMOVE_ALL_EXERCISES':
      nextState.selectedExercises = []
      break

    case 'SET_REST':
      nextState.rest = action.data
      break

    case 'SET_WORKOUT_START_TIME':
      nextState.workoutStartTime = action.data
      nextState.workoutEndTime = null
      nextState.cycles = 1
      nextState.currentIndexExercise = 0
      break

    case 'SET_WORKOUT_END_TIME':
      nextState.workoutEndTime = action.data
      nextState.workouts = [{
        workoutStartTime: nextState.workoutStartTime,
        workoutEndTime: nextState.workoutEndTime,
        time: (nextState.workoutEndTime - nextState.workoutStartTime) / 1000,
        cycles: nextState.cycles,
        rest: nextState.rest,
        selectedExercises: nextState.selectedExercises
      }].concat(nextState.workouts)
      break

    case 'ADD_CYCLE':
      nextState.cycles = nextState.cycles + 1
      break

    case 'RESET_CYCLES':
      nextState.cycles = 1
      break

    case 'SET_CYCLES':
      nextState.cycles = +action.data
      break

    case 'SET_CURRENT_INDEX_EXERCISE':
      nextState.currentIndexExercise = action.data
      break

    case 'SET_WORKOUTS':
      nextState.workouts = action.data || []
      break

    case 'SET_SAVE_WORKOUT_LIST':
      nextState.workoutListName = action.data
      if (nextState.workoutListName) {
        const data = {
          code: uuid(),
          name: nextState.workoutListName,
          selectedExercises: nextState.selectedExercises,
          rest: nextState.rest
        }
        const hasItem = false
        nextState.savedWorkoutLists = nextState.savedWorkoutLists.map(item => {
          if (item.name === nextState.workoutListName) {
            item = { ...data }
          }
          return item
        })
        if (!hasItem) {
          nextState.savedWorkoutLists.push(data)
        }
      }
      break

    case 'SET_WORKOUT_LISTS':
      nextState.savedWorkoutLists = action.data || []
      break

    case 'SELECT_WORKOUT_LIST':
      const item = nextState.savedWorkoutLists.find(item => {
        return item.code === action.data
      })
      nextState.selectedExercises = item.selectedExercises
      nextState.rest = item.rest
      break

    case 'DELETE_WORKOUT_LIST':
      nextState.savedWorkoutLists = nextState.savedWorkoutLists
        .filter(item => {
          return item.code !== action.data
        })
      break

    default:
      nextState = state
      break
  }

  return nextState
}
