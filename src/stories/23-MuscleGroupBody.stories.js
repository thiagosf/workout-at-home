import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { MuscleGroupBody } from '../components/MuscleGroup'

export default {
  title: 'MuscleGroupBody',
  component: MuscleGroupBody,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const muscleGroupsInput = text('Muscle groups', 'Abs, Triceps, Back')
  const muscleGroups = muscleGroupsInput.split(',')
    .map(name => name.trim())
    .map((name, index) => ({ name, primary: index === 0 }))
  const width = text('width', '100%')
  return (
    <MuscleGroupBody
      width={width}
      muscleGroups={muscleGroups}
    />
  )
}
