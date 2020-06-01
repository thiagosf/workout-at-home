import React from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core'
import { base } from '../../ui/themes'

export default function Base({ children }) {
  return (
    <ThemeProvider theme={base}>
      <CSSReset />
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  )
}
