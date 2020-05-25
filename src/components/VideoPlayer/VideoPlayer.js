import React from 'react'
import YouTube from 'react-youtube'

function VideoPlayer ({
  url,
  onPlay,
  onPause,
  onEnd
}) {
  const videoId = url.split('?v=').pop().trim()
  return (
    <YouTube
      videoId={videoId}
      onPlay={onPlay}
      onPause={onPause}
      onEnd={onEnd}
    />
  )
}

export default VideoPlayer
