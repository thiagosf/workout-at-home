import React from 'react'
import { action } from '@storybook/addon-actions'
import { withColorMode } from './decorators'
import { ExerciseMiniList } from '../components/Exercise'

export default {
  title: 'ExerciseMiniList',
  component: ExerciseMiniList,
  decorators: [withColorMode]
}

export const Default = () => {
  const exercise = {
    id: 1,
    name: 'Ab Roller',
    level: 3,
    likes: 3,
    muscleGroups: [{
      name: 'Abs',
      primary: true
    }, {
      name: 'Triceps',
      primary: false
    }, {
      name: 'Back',
      primary: false
    }],
    requirements: [{
      name: 'Ab wheel'
    }]
  }
  const exercises = Array(10).fill(0).map((_, index) => {
    const id = index + 1
    return {
      ...exercise,
      id,
      name: `${exercise.name} ${id}`
    }
  })
  return (
    <ExerciseMiniList
      exercises={exercises}
      onChange={action('changed')}
    />
  )
}
