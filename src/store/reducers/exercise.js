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
  cycles: 1
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
      break

    case 'SET_WORKOUT_END_TIME':
      nextState.workoutEndTime = action.data
      break

    case 'ADD_CYCLE':
      nextState.cycles = nextState.cycles + 1
      break

    case 'RESET_CYCLES':
      nextState.cycles = 1
      break

    default:
      nextState = state
      break
  }

  return nextState
}
