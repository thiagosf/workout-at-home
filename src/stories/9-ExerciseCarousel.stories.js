import React from 'react'
import { action } from '@storybook/addon-actions'
import { withColorMode } from './decorators'
import { ExerciseCarousel } from '../components/Exercise'

export default {
  title: 'ExerciseCarousel',
  component: ExerciseCarousel,
  decorators: [withColorMode]
}

export const Default = () => {
  const exercises = [{
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
  }, {
    id: 2,
    name: 'Push up',
    likes: 9,
    level: 4,
    muscle_groups: [{
      name: 'Triceps',
      primary: true
    }, {
      name: 'Back',
      primary: false
    }],
    requirements: [{
      name: 'No equipament'
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
  }]
  const selecteds = [2]
  return (
    <ExerciseCarousel
      onSelect={action('selected')}
      selecteds={selecteds}
      exercises={exercises}
    />
  )
}
