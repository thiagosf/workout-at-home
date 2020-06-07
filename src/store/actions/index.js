export const beforeSend = (identifier = null, settings = {}) => {
  return {
    type: 'BEFORE_SEND',
    identifier,
    ...settings
  }
}

export const afterResponse = (identifier = null, settings = {}) => {
  return {
    type: 'AFTER_RESPONSE',
    identifier,
    ...settings
  }
}
