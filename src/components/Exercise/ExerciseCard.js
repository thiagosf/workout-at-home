import React from 'react'
import {
  Flex,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions } from '../../ui'

function ExerciseCard ({ children, ...props }) {
  const { colorMode } = useColorMode()
  const allColors = {
    background: {
      normal: {
        light: colors.white,
        dark: colors.gray800
      }
    },
    shadow: {
      normal: {
        light: 'sm',
        dark: null
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const background = resolveColor('background')
  const shadow = resolveColor('shadow')

  return (
    <Flex
      transition={transitions.common}
      background={background}
      padding="15px"
      borderRadius="20px"
      shadow={shadow}
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >{children}</Flex>
  )
}

export default ExerciseCard
