import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { NumberControl } from '../components/NumberControl'

export default {
  title: 'NumberControl',
  component: NumberControl,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <NumberControl
      initialValue={number('initial value', 5)}
      onChange={action('changed')}
    />
  )
}
