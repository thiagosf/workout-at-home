import React from 'react'
import { action } from '@storybook/addon-actions'
import { withColorMode } from './decorators'
import { RestBetweenExercises } from '../components/Exercise'

export default {
  title: 'RestBetweenExercises',
  component: RestBetweenExercises,
  decorators: [withColorMode]
}

export const Default = () => {
  return (
    <RestBetweenExercises
      initialData={{ seconds: 40 }}
      onChange={action('changed')}
    />
  )
}
