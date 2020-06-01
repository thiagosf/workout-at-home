export function loadExercises () {
  return dispatch => {
    const data = []
    return dispatch({ type: 'SET_EXERCISES', data })
  }
}
