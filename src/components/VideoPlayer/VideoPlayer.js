import React from 'react'
import YouTube from 'react-youtube'

function VideoPlayer ({ url }) {
  const videoId = url.split('?v=').pop().trim()
  return (
    <YouTube videoId={videoId} />
  )
}

export default VideoPlayer
