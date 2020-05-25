import React from 'react'
import { Text, Link, useColorMode } from '@chakra-ui/core'
import { colors } from '../../ui'

function Logo ({ onClick }) {
  const { colorMode } = useColorMode()
  const allColors = {
    workout: {
      normal: {
        light: colors.gray400,
        dark: colors.gray400
      }
    },
    home: {
      normal: {
        light: colors.gray500,
        dark: colors.white
      }
    }
  }
  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const workoutColor = resolveColor('workout')
  const homeColor = resolveColor('home')
  return (
    <Link
      onClick={onClick ? onClick : () => {}}
      color={homeColor}
      display="inline-flex"
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Text
        color={workoutColor}
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
