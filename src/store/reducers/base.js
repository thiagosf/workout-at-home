const initialState = {
  footer: false
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

    default:
      nextState = state
      break
  }

  return nextState
}
