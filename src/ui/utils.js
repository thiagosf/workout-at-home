export default {
  /**
   * Return color by intent
   * @param {object} props
   * @param {string} [state=normal]
   * @returns {string}
   */
  getColorByIntent (props, state = 'normal') {
    return props
      ? props.theme[state][props.intent]
      : props.theme[state].default
  },

  /**
   * Get value by mode
   * @param {object} props
   * @param {string} [state=normal]
   * @returns {string}
   */
  valueByMode (lightMode, darkMode, mode) {
    return mode === 'light'
      ? lightMode
      : darkMode
  }
}
