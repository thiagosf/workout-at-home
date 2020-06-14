export default store => {
  const saveStates = {
    exercise: [{
      name: 'selectedExercises',
      type: 'ADD_EXERCISE',
      field: 'data'
    }, {
      name: 'rest',
      type: 'SET_REST',
      field: 'data'
    }, {
      name: 'workoutStartTime',
      type: 'SET_WORKOUT_START_TIME',
      field: 'data'
    }]
  }
  return () => {
    const state = store.getState()
    if (state.base.enableSync) {
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
