import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { TabBarBackground, TabBarButton } from '../components/TabBar'

export default {
  title: 'TabBarButton',
  component: TabBarButton,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  return (
    <TabBarBackground>
      <TabBarButton
        onClick={action('clicked')}
        icon={text('Icon', 'pencil')}
        counter={number('Counter', 99)}
      >
        {text('Text', 'Edit list')}
      </TabBarButton>
    </TabBarBackground>
  )
}
