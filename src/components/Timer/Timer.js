import React, { useState, useEffect } from 'react'
import {
  Flex,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'
import { timerFormatter } from '../../utils/date'

function Timer ({
  initialSeconds = 0,
  isStarted
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    icon: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    },
    main: {
      normal: {
        light: colors.gray800,
        dark: colors.gray200
      }
    },
    milliseconds: {
      normal: {
        light: colors.gray500,
        dark: colors.gray500
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const state = 'normal'
  const iconColor = resolveColor('icon', state)
  const mainColor = resolveColor('main', state)
  const millisecondsColor = resolveColor('milliseconds', state)

  const [prevInitialSeconds, setPrevInitialSeconds] = useState(0)
  const [timer, setTimer] = useState(initialSeconds * 100)
  const milliseconds = timer * 10
  const [mainTimer, millisecondsTimer] = timerFormatter(milliseconds)

  if (prevInitialSeconds !== initialSeconds) {
    setTimer(initialSeconds * 100)
    setPrevInitialSeconds(initialSeconds)
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isStarted) {
        setTimer(timer + 1)
      }
    }, 10)
    return () => {
      clearInterval(timerInterval)
    }
  }, [isStarted, timer, setTimer])

  return (
    <Flex
      alignItems="center"
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
