import React from 'react'
import { withKnobs, number, boolean, radios } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { RepetitionCount } from '../components/RepetitionCount'

export default {
  title: 'RepetitionCount',
  component: RepetitionCount,
  decorators: [withKnobs, withColorMode]
}

const countTypeOptions = {
  Reps: 'reps',
  Seconds: 'secs'
}

export const Default = () => {
  return (
    <RepetitionCount
      count={number('count (0 == max)', 15)}
      countType={radios('count type', countTypeOptions, 'reps')}
      isStarted={boolean('is started', false)}
    />
  )
}
