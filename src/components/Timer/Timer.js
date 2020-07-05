import React, { useState } from 'react'
import {
  Flex,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'
import { date } from '../../utils'
import { useInterval } from '../../hooks'

function Timer ({
  initialSeconds = 0,
  isStarted,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const iconColor = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )
  const mainColor = valueByMode(
    colors.gray800,
    colors.gray200,
    colorMode
  )
  const millisecondsColor = valueByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )

  const [prevInitialSeconds, setPrevInitialSeconds] = useState(0)
  const [timer, setTimer] = useState(initialSeconds * 100)
  const milliseconds = timer * 10
  const [mainTimer, millisecondsTimer] = date.timerFormatter(milliseconds)

  if (prevInitialSeconds !== initialSeconds) {
    setTimer(initialSeconds * 100)
    setPrevInitialSeconds(initialSeconds)
  }

  useInterval(() => {
    if (isStarted) {
      setTimer(timer + 1)
    }
  }, 10)

  return (
    <Flex
      alignItems="center"
      {...props}
    >
      <Icon
        color={iconColor}
        size="26px"
        name="timer"
        marginRight="5px"
      />
      <Flex
        alignItems="center"
        marginTop="2px"
      >
        <Text
          as="span"
          lineHeight="1"
          fontWeight="600"
          fontSize="26px"
          color={mainColor}
        >{mainTimer}</Text>
        <Text
          as="span"
          lineHeight="1"
          fontSize="16px"
          marginLeft="3px"
          color={millisecondsColor}
        >.{millisecondsTimer}</Text>
      </Flex>
    </Flex>
  )
}

export default Timer
