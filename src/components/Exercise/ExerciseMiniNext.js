import React from 'react'
import {
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import ExerciseCard from './ExerciseCard'
import ExerciseHeader from './ExerciseHeader'
import { colors, utils } from '../../ui'

function ExerciseMiniNext ({
  exercise,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const color = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const textColor = valueByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )

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
