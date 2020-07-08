export default function () {
  return ((Math.random() * Date.now()).toString(36))
    .toLowerCase()
    .replace(/[^A-Z0-9]/ig, '')
}
