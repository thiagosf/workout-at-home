export function showFooter (data) {
  return dispatch => {
    dispatch({ type: 'SHOW_FOOTER', data })
  }
}

export function syncLocalStorage () {
  return dispatch => {
    try {
      const savedState = JSON.parse(
        window.localStorage.getItem('saved_state')
      )
      if (savedState) {
        for (const reducerName in savedState) {
          for (const item of Object.values(savedState[reducerName])) {
            dispatch({
              type: item.type,
              [item.field]: item.value
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: 'ENABLE_SYNC' })
    }
  }
}

export function setOnboarding (data) {
  return dispatch => {
    dispatch({ type: 'SET_ONBOARDING', data })
  }
}
