import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { WaitBeforeNextExercise } from '../components/Exercise'

export default {
  title: 'WaitBeforeNextExercise',
  component: WaitBeforeNextExercise,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <WaitBeforeNextExercise
      seconds={3}
      isStarted={boolean('started', false)}
      onFinish={action('finished')}
    />
  )
}
