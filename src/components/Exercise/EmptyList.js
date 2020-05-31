import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function EmptyList ({ props }) {
  const { colorMode } = useColorMode()
  const allColors = {
    text: {
      normal: {
        light: colors.gray400,
        dark: colors.gray500
      }
    },
    icon: {
      normal: {
        light: colors.gray400,
        dark: colors.gray500
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const textColor = resolveColor('text', 'normal')
  const iconColor = resolveColor('icon', 'normal')

  return (
    <Box
      textAlign="center"
    >
      <Text
        fontSize="22px"
        color={textColor}
        margin="0 0 10px 0"
      >Your list is empty!</Text>
      <Icon
        name="empty"
        size="100px"
        color={iconColor}
      />
    </Box>
  )
}

export default EmptyList
