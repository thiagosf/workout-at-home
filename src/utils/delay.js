export default function (delay) {
  return new Promise(r => setTimeout(r, delay))
}
