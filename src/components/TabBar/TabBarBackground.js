import React from 'react'
import {
  Box,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function TabBarBackground ({ children, ...props }) {
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
      padding="15px 10px 10px 10px"
      style={{
        clipPath: "ellipse(100% 85px at 50% 85px)"
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default TabBarBackground
