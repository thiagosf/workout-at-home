import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { Exercise } from '../components/Exercise'

export default {
  title: 'Exercise',
  component: Exercise,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const exercise = {
    id: 1,
    name: 'Ab Roller',
    likes: 2,
    level: 2,
    muscle_groups: [{
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
    }],
    images: [{
      url: 'https://via.placeholder.com/600x300?text=1',
      credits: 'https://workoutlabs.com/exercise-guide/ab-roller-wheel-rollout/'
    }, {
      url: 'https://via.placeholder.com/600x300?text=2',
      credits: 'https://workoutlabs.com/exercise-guide/ab-roller-wheel-rollout/'
    }, {
      url: 'https://via.placeholder.com/600x300?text=3',
      credits: 'https://workoutlabs.com/exercise-guide/ab-roller-wheel-rollout/'
    }, {
      url: 'https://via.placeholder.com/600x300?text=4',
      credits: 'https://workoutlabs.com/exercise-guide/ab-roller-wheel-rollout/'
    }],
    videos: [{
      url: 'https://www.youtube.com/watch?v=ettaeKZHAwA',
      credits: 'https://www.youtube.com'
    }, {
      url: 'https://www.youtube.com/watch?v=ettaeKZHAwA',
      credits: 'https://www.youtube.com'
    }, {
      url: 'https://www.youtube.com/watch?v=ettaeKZHAwA',
      credits: 'https://www.youtube.com'
    }]
  }
  return (
    <Exercise
      onSelect={action('selected')}
      added={boolean('added', false)}
      exercise={exercise}
    />
  )
}
