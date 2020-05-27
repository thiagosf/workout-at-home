import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { ExerciseFilters } from '../components/Exercise'

export default {
  title: 'ExerciseFilters',
  component: ExerciseFilters,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const equipamentsText = text('Equipaments', 'All, No equipament, Ab Roller, Pull Up Bar')
  const equipaments = equipamentsText.split(',')
    .map(label => label.trim())
    .map(label => {
      return { label, value: label }
    })
  return (
    <ExerciseFilters
      equipaments={equipaments}
      onChange={action('changed')}
    />
  )
}
