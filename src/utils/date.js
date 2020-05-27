export const timerFormatter = milliseconds => {
  const timePast = {
    hours: Math.floor((milliseconds / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((milliseconds / 1000 / 60) % 60),
    seconds: Math.floor((milliseconds / 1000) % 60),
    milliseconds: Math.floor((milliseconds / 10) % 100)
  }
  const addPad = (value, places = 2) =>
    value.toString().padStart(places, '0')
  const minutesSeconds = [
    addPad(timePast.hours),
    addPad(timePast.minutes),
    addPad(timePast.seconds),
  ].join(':')
  const millisecondsFormatted = addPad(timePast.milliseconds)
  return [minutesSeconds, millisecondsFormatted]
}
