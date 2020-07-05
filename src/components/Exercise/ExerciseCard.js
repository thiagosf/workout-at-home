import React from 'react'
import {
  Flex,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions, utils } from '../../ui'

function ExerciseCard ({ children, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const background = valueByMode(
    colors.white,
    colors.gray800,
    colorMode
  )
  const shadow = valueByMode(
    'sm',
    null,
    colorMode
  )

  return (
    <Flex
      transition={transitions.common}
      background={background}
      padding="15px"
      borderRadius="20px"
      shadow={shadow}
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >{children}</Flex>
  )
}

export default ExerciseCard
