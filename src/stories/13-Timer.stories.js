import React from 'react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { Timer } from '../components/Timer'

export default {
  title: 'Timer',
  component: Timer,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <Timer
      initialSeconds={number('initialSeconds', 0)}
      isStarted={boolean('started', false)}
    />
  )
}
