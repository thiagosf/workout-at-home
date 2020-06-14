import React from 'react'

import useEventListener from './use_event_listener'

function getVisibilityPropertyNames() {
  // Opera 12.10 and Firefox 18 and later support
  if (typeof document.hidden !== 'undefined') {
    return ['hidden', 'visibilitychange']
  }

  if (typeof document.msHidden !== 'undefined') {
    return ['msHidden', 'msvisibilitychange']
  }

  if (typeof document.webkitHidden !== 'undefined') {
    return ['webkitHidden', 'webkitvisibilitychange']
  }

  return ['hidden', 'visibilitychange']
}

const [hidden, visibilityChange] = getVisibilityPropertyNames()

function isDocumentHidden() {
  return document[hidden]
}

if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
  console.log(
    'This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.',
  )
}

export function useDocumentVisibilityChange(callback) {
  const onChange = React.useCallback(() => {
    callback(isDocumentHidden())
  }, [callback])

  useEventListener(visibilityChange, onChange, document)
}

export default function useDocumentVisibility() {
  const [isHidden, setHidden] = React.useState(isDocumentHidden())

  const onChange = React.useCallback(state => setHidden(state), [setHidden])

  useDocumentVisibilityChange(onChange)

  return isHidden
}
