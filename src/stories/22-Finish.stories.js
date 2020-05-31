import React from 'react'
import { withColorMode } from './decorators'
import { Finish } from '../components/Exercise'

export default {
  title: 'Finish',
  component: Finish,
  decorators: [withColorMode]
}

export const Default = () => {
  return (
    <Finish />
  )
}
