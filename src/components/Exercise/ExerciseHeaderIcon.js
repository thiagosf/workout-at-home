import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function ExerciseHeaderIcon ({ icon, children }) {
  const { colorMode } = useColorMode()
  const allColors = {
    text: {
      normal: {
        light: colors.gray800,
        dark: colors.gray200
      }
    },
    level: {
      normal: {
        light: colors.gray800,
        dark: colors.gray200
      }
    },
    heart: {
      normal: {
        light: colors.red500,
        dark: colors.red400
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const textColor = resolveColor('text')
  const iconColor = resolveColor(icon)

  return (
    <Box
      textAlign="center"
    >
      <Icon
        name={icon}
        color={iconColor}
        size="30px"
        marginBottom="5px"
      />
      <Text
        fontWeight="700"
        fontSize="20px"
        margin="0"
        color={textColor}
      >{children}</Text>
    </Box>
  )
}

export default ExerciseHeaderIcon
