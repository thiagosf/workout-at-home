import React, { useState } from 'react'
import {
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'
import { useInterval } from '../../hooks'

function WaitBeforeNextExercise ({
  seconds = 0,
  onFinish,
  isStarted,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const waitColor = valueByMode(
    colors.gray400,
    colors.gray500,
    colorMode
  )
  const secondsColor = valueByMode(
    colors.gray900,
    colors.gray200,
    colorMode
  )
  const textSecondsColor = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )

  const [timer, setTimer] = useState(seconds)
  const timerText = timer >= 0
    ? timer
    : 'Go!'

  useInterval(() => {
    if (isStarted && timer > -1) {
      const newTimer = timer - 1
      setTimer(newTimer)
      if (newTimer === 0 && onFinish) {
        onFinish()
      }
    }
  }, 1000)

  return (
    <Box
      textAlign="center"
      {...props}
    >
      <Text
        lineHeight="1"
        fontSize="16px"
        color={waitColor}
        margin="0 0 20px 0"
      >Wait:</Text>
      <Text
        lineHeight="1"
        fontWeight="600"
        fontSize="120px"
        color={secondsColor}
        margin="0"
      >{timerText}</Text>
      {timer >= 0 &&
        <Text
          lineHeight="1"
          fontSize="24px"
          color={textSecondsColor}
          margin="0"
        >seconds</Text>
      }
    </Box>
  )
}

export default WaitBeforeNextExercise
