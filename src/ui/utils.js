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
  }
}
