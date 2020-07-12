export default store => {
  const saveStates = {
    exercise: [{
      name: 'selectedExercises',
      type: 'SET_SELECTED_EXERCISES',
      field: 'data'
    }, {
      name: 'rest',
      type: 'SET_REST',
      field: 'data'
    }, {
      name: 'workoutStartTime',
      type: 'SET_WORKOUT_START_TIME',
      field: 'data'
    }, {
      name: 'workoutEndTime',
      type: 'SET_WORKOUT_END_TIME',
      field: 'data'
    }, {
      name: 'cycles',
      type: 'SET_CYCLES',
      field: 'data'
    }, {
      name: 'workouts',
      type: 'SET_WORKOUTS',
      field: 'data'
    }, {
      name: 'savedWorkoutLists',
      type: 'SET_WORKOUT_LISTS',
      field: 'data'
    }],
    base: [{
      name: 'onboarding',
      type: 'SET_ONBOARDING',
      field: 'data'
    }, {
      name: 'addToHomeScreen',
      type: 'SET_ADD_TO_HOME_SCREEN',
      field: 'data'
    }]
  }
  return () => {
    const state = store.getState()
    if (state.base.enabledSync) {
      const stateToSave = {}
      for (const reducerName in saveStates) {
        const item = state[reducerName]
        const fields = saveStates[reducerName]
        for (const field of fields) {
          const value = item[field.name]
          stateToSave[reducerName] = stateToSave[reducerName] || {}
          stateToSave[reducerName][field.name] = {
            value,
            field: field.field,
            type: field.type
          }
        }
      }
      window.localStorage.setItem('saved_state', JSON.stringify(stateToSave))
    }
  }
}
