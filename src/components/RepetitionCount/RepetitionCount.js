import React, { useState } from 'react'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'
import { useInterval } from '../../hooks'

function RepetitionCount ({
  count,
  countType,
  isStarted = false
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const countColor = valueByMode(
    colors.gray900,
    colors.gray200,
    colorMode
  )
  const countTypeColor = valueByMode(
    colors.green500,
    colors.green400,
    colorMode
  )
  const overtimeColor = valueByMode(
    colors.red300,
    colors.red300,
    colorMode
  )

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
