import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withColorMode } from './decorators'
import { TabBar } from '../components/TabBar'

export default {
  title: 'TabBar',
  component: TabBar,
  decorators: [withKnobs, withColorMode]
}

export const Default = () => {
  const leftButtonActive = boolean('left button', true)
  const rightButtonActive = boolean('right button', true)
  const leftButton = leftButtonActive
    ? {
      label: 'Edit list',
      icon: 'pencil',
      counter: 10
    }
    : null
  const rightButton = rightButtonActive
    ? {
      label: 'Filter',
      icon: 'filter',
      counter: 2
    }
    : null
  const mainButton = {
    label: 'Start!',
    icon: 'ray'
  }
  return (
    <TabBar
      leftButton={leftButton}
      rightButton={rightButton}
      mainButton={mainButton}
      onClickLeft={action('left clicked')}
      onClickRight={action('right clicked')}
      onClickMain={action('main button clicked')}
    />
  )
}
