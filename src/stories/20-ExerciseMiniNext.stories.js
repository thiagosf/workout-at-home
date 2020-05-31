import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { ExerciseMiniNext } from '../components/Exercise'

export default {
  title: 'ExerciseMiniNext',
  component: ExerciseMiniNext,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const muscleGroupsInput = text('Muscle groups', 'Abs, Triceps, Back')
  const muscleGroups = muscleGroupsInput.split(',')
    .map(name => name.trim())
    .map((name, index) => ({ name, primary: index === 0 }))
  const requirementsInput = text('Requirements', 'Ab wheel')
  const requirements = requirementsInput.split(',')
    .map(name => name.trim())
    .map(name => ({ name }))
  const exercise = {
    name: text('Text', 'Ab Roller'),
    level: number('Level', 3),
    likes: number('Likes', 3),
    muscleGroups: muscleGroups,
    requirements: requirements
  }
  return (
    <ExerciseMiniNext
      exercise={exercise}
    />
  )
}
