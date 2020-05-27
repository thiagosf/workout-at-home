import React from 'react'
import { withColorMode } from './decorators'
import { Header } from '../components/Header'

export default {
  title: 'Header',
  component: Header,
  decorators: [withColorMode]
}

export const Default = () => {
  return (
    <Header />
  )
}
