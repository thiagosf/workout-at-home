import React, { Component } from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core'
import { base } from '../../ui/themes'

class Base extends Component {
  render () {
    return (
      <ThemeProvider theme={base}>
        <CSSReset />
        <ColorModeProvider>
          {this.props.children}
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}

export default Base
