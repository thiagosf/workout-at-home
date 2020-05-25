import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { MuscleGroupCount } from '../components/MuscleGroup'

export default {
  title: 'MuscleGroupCount',
  component: MuscleGroupCount,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <MuscleGroupCount
      onClick={action('clicked')}
      active={boolean('Active', false)}
      name={text('Text', 'Legs')}
      count={text('Count', '99')}
    />
  )
}
