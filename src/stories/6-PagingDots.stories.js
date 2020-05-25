import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { PagingDots } from '../components/PagingDots'

export default {
  title: 'PagingDots',
  component: PagingDots,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <PagingDots
      pages={number('Pages', 3)}
      currentPage={number('Page', 1)}
    />
  )
}
