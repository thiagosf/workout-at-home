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

export function removeAllExercises () {
  return async dispatch => {
    dispatch({ type: 'REMOVE_ALL_EXERCISES' })
  }
}

export function setRest (data) {
  return async dispatch => {
    dispatch({ type: 'SET_REST', data })
  }
}

export function setWorkoutStartTime (data) {
  return async dispatch => {
    dispatch({ type: 'SET_WORKOUT_START_TIME', data })
  }
}

export function setWorkoutEndTime (data) {
  return async dispatch => {
    dispatch({ type: 'SET_WORKOUT_END_TIME', data })
  }
}

export function addCycle (data) {
  return async dispatch => {
    dispatch({ type: 'ADD_CYCLE', data })
  }
}

export function resetCycles (data) {
  return async dispatch => {
    dispatch({ type: 'RESET_CYCLES', data })
  }
}
