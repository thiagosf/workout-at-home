import React from 'react'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'

const Home = () => {
  const onSelect = value => {
    console.log('onSelect', value)
  }
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
    name: 'Abs',
    count: 7
  }, {
    name: 'Triceps',
    count: 15
  }, {
    name: 'Abs',
    count: 7
  }, {
    name: 'Triceps',
    count: 15
  }]
  return (
    <Layout>
      <MuscleGroup
        onSelect={onSelect}
        muscleGroups={muscleGroups}
      />
    </Layout>
  )
}

export default Home
