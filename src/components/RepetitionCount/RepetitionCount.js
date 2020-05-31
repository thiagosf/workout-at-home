import React, { useState } from 'react'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'
import { useInterval } from '../../hooks'

function RepetitionCount ({
  count,
  countType,
  isStarted = false
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    count: {
      normal: {
        light: colors.gray900,
        dark: colors.gray200
      }
    },
    countType: {
      normal: {
        light: colors.green500,
        dark: colors.green400
      }
    },
    overtime: {
      normal: {
        light: colors.red300,
        dark: colors.red300
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const state = 'normal'
  const countColor = resolveColor('count', state)
  const countTypeColor = resolveColor('countType', state)
  const overtimeColor = resolveColor('overtime', state)

  const [timer, setTimer] = useState(0)
  const overtime = countType === 'reps'
    ? 0
    : timer - count
  const countText = countType === 'reps'
    ? (
      count === 0
        ? 'Max'
        : count
    )
    : (
      timer > count
        ? count
        : timer
    )
  const countTypeText = countType === 'reps'
    ? 'reps'
    : 'secs'

  useInterval(() => {
    if (isStarted) {
      setTimer(timer + 1)
    }
  }, 1000)

  return (
    <Flex
      flexDirection="column"
    >
      <Flex alignItems="center">
        <Text
          as="span"
          lineHeight="1"
          fontWeight="600"
          fontSize="26px"
          color={countColor}
        >{countText}</Text>
        <Text
          as="span"
          lineHeight="1"
          fontSize="26px"
          marginLeft="5px"
          color={countTypeColor}
        >{countTypeText}</Text>
      </Flex>
      {overtime > 0 &&
        <Text
          as="span"
          lineHeight="1"
          fontSize="16px"
          color={overtimeColor}
        >+{overtime}</Text>
      }
    </Flex>
  )
}

export default RepetitionCount
