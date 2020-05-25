import React from 'react'
import {
  Box,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function TabBarBackground ({ children }) {
  const { colorMode } = useColorMode()
  const allColors = {
    background: {
      normal: {
        light: colors.blue800,
        dark: colors.gray800
      }
    }
  }
  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const background = resolveColor('background')
  return (
    <Box
      background={background}
      padding="30px 10px 10px 10px"
      style={{
        clipPath: "ellipse(70% 85px at 50% 85px)"
      }}
    >
      {children}
    </Box>
  )
}

export default TabBarBackground
