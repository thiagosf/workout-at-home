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

export function filterMuscleGroup (data) {
  return async dispatch => {
    dispatch({ type: 'FILTER_MUSCLE_GROUP', data })
  }
}

export function filterEquipaments (data) {
  return async dispatch => {
    dispatch({ type: 'FILTER_EQUIPAMENTS', data })
  }
}

export function addExercise (data) {
  return async dispatch => {
    dispatch({ type: 'ADD_EXERCISE', data })
  }
}

export function removeExercise (data) {
  return async dispatch => {
    dispatch({ type: 'REMOVE_EXERCISE', data })
  }
}
