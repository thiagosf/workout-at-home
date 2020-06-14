import React from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box
} from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import { colors } from '../../ui'
import { base } from '../../ui/themes'

const styles = css`
  :root {
    --text-color-light: ${colors.gray900};
    --text-color-dark: ${colors.white};
  }
  body.light-mode {
    color: var(--text-color-light);
  }
  body.dark-mode {
    color: var(--text-color-dark);
  }
  .swiper-container-full {
    width: 100%;
    height: 100%;
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
  .advice-landscape {
    display: none;
  }
  @media screen and (max-width: 767px) and (orientation: landscape) {
    .all-content {
      display: none;
    }
    .advice-landscape {
      display: flex;
      background: ${colors.red500};
      color: ${colors.white};
      justify-content: center;
      align-items: center;
      font-size: 4vw;
      height: 100vh;
    }
  }
`

export default function Base({ children }) {
  return (
    <ThemeProvider theme={base}>
      <Global styles={styles} />
      <CSSReset />
      <Box className="all-content">
        <ColorModeProvider>{children}</ColorModeProvider>
      </Box>
      <Box
        className="advice-landscape"
      >Please, rotate your device!</Box>
    </ThemeProvider>
  )
}
