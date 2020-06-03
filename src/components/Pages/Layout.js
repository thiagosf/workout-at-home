import React, { useEffect } from 'react'
import { Flex, Box, useColorMode } from '@chakra-ui/core'
import { Header } from '../Header'
import { colors } from '../../ui'

export default function Layout({ children, footer }) {
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <Flex
      color={color}
      background={backgroundColor}
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box padding="10px">
        <Header
          colorMode={colorMode}
          onColorModeSwitch={toggleColorMode}
        />
      </Box>
      <Flex
        flexGrow="1"
        overflow="auto"
        flexDirection="column"
      >
        {children}
      </Flex>
      <Box>
        {footer}
      </Box>
    </Flex>
  )
}
