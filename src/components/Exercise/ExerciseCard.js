import React from 'react'
import {
  Box,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

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
    <Box
      background={background}
      padding="20px 25px"
      borderRadius="20px"
      shadow={shadow}
      {...props}
    >{children}</Box>
  )
}

export default ExerciseCard
