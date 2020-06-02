import exercisesJSON from '../../data/exercises.json'

export function loadExercises () {
  return async dispatch => {
    const { data } = exercisesJSON
    return dispatch({ type: 'SET_EXERCISES', data })
  }
}
