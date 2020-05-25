import React from 'react'
import { Text, Link, useColorMode } from '@chakra-ui/core'
import { colors } from '../../ui'

function Logo ({ onClick }) {
  const { colorMode } = useColorMode()
  const allColors = {
    text: {
      normal: {
        light: colors.white,
        dark: colors.white
      }
    }
  }
  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const textColor = resolveColor('text')
  return (
    <Link
      onClick={onClick ? onClick : () => {}}
      color={textColor}
      display="inline-flex"
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Text
        color={colors.gray300}
        margin="0"
        fontSize="24px"
        fontWeight="400"
      >Workout</Text>
      <Text
        margin="0"
        fontSize="24px"
        fontWeight="600"
      >Home</Text>
    </Link>
  )
}

export default Logo
