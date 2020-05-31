import React from 'react'
import {
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import ExerciseCard from './ExerciseCard'
import ExerciseHeader from './ExerciseHeader'
import { colors } from '../../ui'

function ExerciseMiniNext ({
  exercise,
  ...props
}) {
  const allColors = {
    color: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    text: {
      normal: {
        light: colors.gray500,
        dark: colors.gray500
      }
    }
  }

  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const color = resolveColor('color', 'normal')
  const textColor = resolveColor('text', 'normal')

  return (
    <Box>
      <Text
        color={textColor}
        fontSize="14px"
        margin="0 0 10px 0"
      >Next exercise:</Text>
      <ExerciseCard
        color={color}
        {...props}
      >
        <ExerciseHeader
          {...exercise}
          visible={{
            likes: true,
            level: true,
            name: true,
            muscleGroups: true,
            requirements: true
          }}
          flexGrow="1"
        />
      </ExerciseCard>
    </Box>
  )
}

export default ExerciseMiniNext
