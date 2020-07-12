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
  return dispatch => {
    dispatch({ type: 'FILTER_MUSCLE_GROUP', data })
  }
}

export function filterEquipaments (data) {
  return async dispatch => {
    dispatch({ type: 'FILTER_EQUIPAMENTS', data })
  }
}

export function addExercise (data) {
  return dispatch => {
    dispatch({ type: 'ADD_EXERCISE', data })
  }
}

export function updateExercise (data) {
  return dispatch => {
    dispatch({ type: 'UPDATE_EXERCISE', data })
  }
}

export function removeExercise (data) {
  return dispatch => {
    dispatch({ type: 'REMOVE_EXERCISE', data })
  }
}

export function removeAllExercises () {
  return dispatch => {
    dispatch({ type: 'REMOVE_ALL_EXERCISES' })
  }
}

export function setRest (data) {
  return dispatch => {
    dispatch({ type: 'SET_REST', data })
  }
}

export function setWorkoutStartTime (data) {
  return dispatch => {
    dispatch({ type: 'SET_WORKOUT_START_TIME', data })
  }
}

export function setWorkoutEndTime (data) {
  return dispatch => {
    dispatch({ type: 'SET_WORKOUT_END_TIME', data })
  }
}

export function resetCycles () {
  return dispatch => {
    dispatch({ type: 'RESET_CYCLES' })
  }
}

export function setCycles () {
  return dispatch => {
    dispatch({ type: 'SET_CYCLES' })
  }
}

export function nextExercise () {
  return (dispatch, getState) => {
    const state = getState()
    const {
      selectedExercises,
      currentIndexExercise
    } = state.exercise
    let nextIndexExercise = currentIndexExercise + 1
    const nextExercise = selectedExercises.find((item, index) => {
      return +index === nextIndexExercise
    })
    if (!nextExercise) {
      dispatch({ type: 'ADD_CYCLE' })
      nextIndexExercise = 0
    }
    dispatch({
      type: 'SET_CURRENT_INDEX_EXERCISE',
      data: nextIndexExercise
    })
  }
}

export function saveWorkoutList (data) {
  return dispatch => {
    dispatch({
      type: 'SET_SAVE_WORKOUT_LIST',
      data
    })
  }
}

export function selectWorkoutList (data) {
  return dispatch => {
    dispatch({
      type: 'SELECT_WORKOUT_LIST',
      data
    })
  }
}

export function deleteWorkoutList (data) {
  return dispatch => {
    dispatch({
      type: 'DELETE_WORKOUT_LIST',
      data
    })
  }
}
