import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function ExerciseHeaderIcon ({ icon, children, ...props }) {
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
      {...props}
    >
      <Icon
        name={icon}
        color={iconColor}
        size="26px"
        marginBottom="3px"
      />
      <Text
        fontWeight="600"
        fontSize="16px"
        margin="0"
        color={textColor}
      >{children}</Text>
    </Box>
  )
}

export default ExerciseHeaderIcon