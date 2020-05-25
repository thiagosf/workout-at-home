import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { ColorModeSwitch } from '../components/ColorModeSwitch'

export default {
  title: 'ColorModeSwitch',
  component: ColorModeSwitch,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <ColorModeSwitch
      onChange={action('changed')}
      mode={text('light', 'light')}
    />
  )
}
