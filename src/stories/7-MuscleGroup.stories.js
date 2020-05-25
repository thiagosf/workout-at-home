import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { MuscleGroup } from '../components/MuscleGroup'

export default {
  title: 'MuscleGroup',
  component: MuscleGroup,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const muscleGroups = [{
    name: 'Legs',
    count: 99
  }, {
    name: 'Abs',
    count: 7,
    active: true
  }, {
    name: 'Triceps',
    count: 15
  }, {
    name: 'Biceps',
    count: 12
  }, {
    name: 'Shoulders',
    count: 5
  }, {
    name: 'Core',
    count: 7
  }, {
    name: 'Trapezius',
    count: 3
  }, {
    name: 'Arms',
    count: 12
  }, {
    name: 'Calves',
    count: 1
  }, {
    name: 'Neck',
    count: 2
  }, {
    name: 'Chest',
    count: 15
  }]
  return (
    <MuscleGroup
      onSelect={action('selected')}
      muscleGroups={muscleGroups}
    />
  )
}
