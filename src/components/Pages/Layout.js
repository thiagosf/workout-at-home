import React from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import { Header } from '../Header'
import { colors } from '../../ui'

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const allColors = {
    color: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    background: {
      normal: {
        light: colors.gray200,
        dark: colors.gray900
      }
    }
  }
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const color = resolveColor('color', 'normal')
  const backgroundColor = resolveColor('background', 'normal')

  return (
    <Box
      color={color}
      background={backgroundColor}
      minHeight="100vh"
    >
      <Box padding="10px">
        <Header
          colorMode={colorMode}
          onColorModeSwitch={toggleColorMode}
        />
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}
