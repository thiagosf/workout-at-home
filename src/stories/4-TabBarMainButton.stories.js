import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { TabBarMainButton } from '../components/TabBar'

export default {
  title: 'TabBarMainButton',
  component: TabBarMainButton,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <TabBarMainButton
      onClick={action('clicked')}
      icon={text('Icon', 'ray')}
    >
      {text('Text', 'Start!')}
    </TabBarMainButton>
  )
}
