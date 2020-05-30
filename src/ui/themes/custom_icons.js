import React from 'react'

const customIcons = {
  heart: {
    path: (
      <path fill="currentColor" d="M112.57,93.54a9.634,9.634,0,0,0-7.8,3.976,9.648,9.648,0,0,0-17.452,5.673c0,8.108,17.452,21.182,17.452,21.182s17.452-13.074,17.452-21.182A9.649,9.649,0,0,0,112.57,93.54Z" transform="translate(-87.315 -93.54)" />
    ),
    viewBox: '0 0 34.904 30.831'
  },
  level: {
    path: (
      <g transform="translate(0 0)"><path fill="#e88734" d="M9.627,17.412h0L0,7.785A26.495,26.495,0,0,1,18.795,0l.324,0V13.618c-.1,0-.21,0-.324,0h0a12.916,12.916,0,0,0-9.159,3.794l0,0Z" transform="translate(35.003 0) rotate(45)"/><path fill="#de4c4c" d="M9.627,17.412h0L0,7.785A26.495,26.495,0,0,1,18.795,0l.324,0V13.618c-.1,0-.21,0-.324,0h0a12.916,12.916,0,0,0-9.159,3.794l0,0Z" transform="translate(57.278 14.377) rotate(90)"/><path fill="#e3df80" d="M9.627,0h0L0,9.627a26.419,26.419,0,0,0,8.793,5.839,26.485,26.485,0,0,0,10,1.946l.324,0V3.793c-.1,0-.21,0-.324,0h0a12.918,12.918,0,0,1-4.874-.949A12.886,12.886,0,0,1,9.631,0l0,0Z" transform="translate(34.588 12.312) rotate(135)"/><path fill="#73c96c" d="M9.627,0h0L0,9.627a26.419,26.419,0,0,0,8.793,5.839,26.485,26.485,0,0,0,10,1.946l.324,0V3.793c-.1,0-.21,0-.324,0h0a12.918,12.918,0,0,1-4.874-.949A12.886,12.886,0,0,1,9.631,0l0,0Z" transform="translate(17.412 14.377) rotate(90)"/><path fill="currentColor" d="M4.862,29.1A4.863,4.863,0,0,1,.827,21.52L5.546,0,9.109,21.865A4.864,4.864,0,0,1,4.862,29.1Zm0-6.483a2.269,2.269,0,1,0,2.269,2.269A2.271,2.271,0,0,0,4.862,22.613Z" transform="translate(32.875 9.352) rotate(21)"/></g>
    ),
    viewBox: '0 0 57.278 40'
  },
  pencil: {
    path: (
      <path fill="currentColor" d="M3,18.829V23H7.166L19.451,10.709,15.286,6.544ZM22.673,7.488a1.106,1.106,0,0,0,0-1.566l-2.6-2.6a1.106,1.106,0,0,0-1.566,0L16.474,5.355,20.64,9.521l2.033-2.033Z" transform="translate(-3 -2.998)"/>
    ),
    viewBox: '0 0 19.998 19.998'
  },
  ray: {
    path: (
      <g fill="currentColor" transform="matrix(0.985, 0.174, -0.174, 0.985, 4.697, 0)"><g transform="translate(0 0)"><g transform="translate(0)"><path d="M0,0V14.878H4.058V27.05l9.468-16.23H8.115L13.525,0Z" transform="translate(0 0)"/></g></g></g>
    ),
    viewBox: '0 0 18.017 28.988'
  },
  filter: {
    path: (
      <path fill="currentColor" d="M5.741,5H23.384a1.357,1.357,0,0,1,.679,2.036L17.276,14.5V24l-5.429-4.071V14.5L5.062,7.036A1.357,1.357,0,0,1,5.741,5" transform="translate(-3.821 -3.725)"/>
    ),
    viewBox: '0 0 21.482 21.275'
  },
  image: {
    path: (
      <g>
        <circle fill="currentColor" cx="12" cy="12" r="3.2"/>
        <path fill="currentColor" d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </g>
    )
  },
  video: {
    path: (
      <path fill="currentColor" d="M13.05 9.79L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"/>
    )
  },
  timer: {
    path: (
      <path fill="currentColor" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
    )
  },
  sort: {
    path: (
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>
    )
  }
}

export default customIcons
