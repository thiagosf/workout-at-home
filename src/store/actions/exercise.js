import {
  beforeSend,
  afterResponse
} from './'
import exercisesJSON from '../../data/exercises.json'

const identifier = 'exercise'

export function loadExercises () {
  return async dispatch => {
    dispatch(beforeSend(identifier))
    return new Promise((resolve, reject) => {
      const { data } = exercisesJSON
      setTimeout(() => {
        dispatch({ type: 'SET_EXERCISES', data })
        dispatch(afterResponse(identifier))
        resolve(data)
      }, 500)
    })
  }
}
