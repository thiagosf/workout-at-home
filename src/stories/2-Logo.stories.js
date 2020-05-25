import React from 'react'
import { action } from '@storybook/addon-actions'
import { withDark } from './decorators'
import { Logo } from '../components/Logo'

export default {
  title: 'Logo',
  component: Logo,
  decorators: [withDark]
}

export const Default = () => {
  return (
    <Logo onClick={action('clicked')} />
  )
}
