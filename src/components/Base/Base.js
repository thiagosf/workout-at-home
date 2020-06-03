import React from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import { base } from '../../ui/themes'

const styles = css`
  .swiper-wrapper {
    min-height: 100%;
  }
  .swiper-slide {
    height: 100%;
    background: red;
  }
`

export default function Base({ children }) {
  return (
    <ThemeProvider theme={base}>
      <Global styles={styles} />
      <CSSReset />
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  )
}
