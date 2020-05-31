import React, { useState } from 'react'
import {
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'
import { useInterval } from '../../hooks'

function WaitBeforeNextExercise ({
  seconds = 0,
  onFinish,
  isStarted,
  ...props
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    wait: {
      normal: {
        light: colors.gray400,
        dark: colors.gray500
      }
    },
    seconds: {
      normal: {
        light: colors.gray900,
        dark: colors.gray200
      }
    },
    textSeconds: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const state = 'normal'
  const waitColor = resolveColor('wait', state)
  const secondsColor = resolveColor('seconds', state)
  const textSecondsColor = resolveColor('textSeconds', state)

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
