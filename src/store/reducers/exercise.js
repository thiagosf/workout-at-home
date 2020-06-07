const initialState = {
  data: null,
  list: [],
  loading: false,
  selectedMuscleGroup: null,
  selectedEquipaments: [],
  selectedExercises: []
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
      const selectedExercises = new Set(nextState.selectedExercises)
      selectedExercises.add(action.data)
      nextState.selectedExercises = [...selectedExercises]
      break
    }

    case 'REMOVE_EXERCISE': {
      const selectedExercises = new Set(nextState.selectedExercises)
      selectedExercises.delete(action.data)
      nextState.selectedExercises = [...selectedExercises]
      break
    }

    default:
      nextState = state
      break
  }

  return nextState
}
