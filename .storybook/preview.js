import React from 'react'
import { addDecorator } from '@storybook/react'
import { Base } from '../src/components/Base'

addDecorator(storyFn => {
  return (
    <Base>
      {storyFn()}
    </Base>
  )
})
