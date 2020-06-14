import React from 'react'

function useEventListener(eventName, handler, element = global) {
  const savedCallback = React.useRef()

  React.useEffect(() => {
    savedCallback.current = handler
  }, [handler])

  React.useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener
    if (!isSupported) {
      return
    }

    const eventListener = event => savedCallback.current(event)

    element.addEventListener(eventName, eventListener)

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
