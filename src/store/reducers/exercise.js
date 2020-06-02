const initialState = {
  data: null,
  list: [],
  loading: false
}

const identifier = 'exercise'

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

    case 'SET_EXERCISES':
      nextState.list = action.data
      break

    default:
      nextState = state
      break
  }

  return nextState
}
