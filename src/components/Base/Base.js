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
  }
  .swiper-slide {
    height: 100% !important;
    justify-content: center;
  }
  .youtube-absolute {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
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
