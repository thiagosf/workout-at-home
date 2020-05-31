const date = require('./date')

describe('date', () => {
  test('should format 1 second', () => {
    expect(date.timerFormatter(1100)).toEqual(['00:00:01', '10'])
  })
  test('should format 100 milliseconds', () => {
    expect(date.timerFormatter(100)).toEqual(['00:00:00', '10'])
  })
})
