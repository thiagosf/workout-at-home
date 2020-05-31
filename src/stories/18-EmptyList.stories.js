import React from 'react'
import { withColorMode } from './decorators'
import { EmptyList } from '../components/Exercise'

export default {
  title: 'EmptyList',
  component: EmptyList,
  decorators: [withColorMode]
}

export const Default = () => {
  return (
    <EmptyList />
  )
}
