const initialState = {
  footer: false,
  enabledSync: false,
  onboarding: false,
  addToHomeScreen: false
}

const identifier = 'base'

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

    case 'SHOW_FOOTER':
      nextState.footer = action.data
      break

    case 'ENABLE_SYNC':
      nextState.enabledSync = true
      break

    case 'SET_ONBOARDING':
      nextState.onboarding = action.data !== undefined
        ? action.data
        : false
      break

    case 'SET_ADD_TO_HOME_SCREEN':
      nextState.addToHomeScreen = action.data !== undefined
        ? action.data
        : false
      break

    default:
      nextState = state
      break
  }

  return nextState
}
