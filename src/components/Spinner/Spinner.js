import React from 'react'
import {
  Flex,
  CircularProgress,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function Spinner ({ ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const progressTrackColor = valueByMode(
    'gray',
    'gray',
    colorMode
  )
  const progressColor = valueByMode(
    'green',
    'green',
    colorMode
  )
  const progressBackgroundColor = valueByMode(
    colors.white,
    colors.gray800,
    colorMode
  )

  return (
    <Flex
      alignSelf="center"
      background={progressBackgroundColor}
      padding="10px"
      rounded="full"
      {...props}
    >
      <CircularProgress
        margin="0"
        isIndeterminate
        size="36px"
        trackColor={progressTrackColor}
        color={progressColor}
      />
    </Flex>
  )
}

export default Spinner
