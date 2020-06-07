export function showFooter (data) {
  return async dispatch => {
    dispatch({ type: 'SHOW_FOOTER', data })
  }
}
