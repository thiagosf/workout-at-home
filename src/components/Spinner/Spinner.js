import React from 'react'
import {
  Flex,
  CircularProgress,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function Spinner ({ ...props }) {
  const allColors = {
    progressTrack: {
      normal: {
        light: 'gray',
        dark: 'gray'
      }
    },
    progress: {
      normal: {
        light: 'green',
        dark: 'green'
      }
    },
    progressBackground: {
      normal: {
        light: colors.white,
        dark: colors.gray800
      }
    }
  }
  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const progressTrackColor = resolveColor('progressTrack', 'normal')
  const progressBackgroundColor = resolveColor('progressBackground', 'normal')
  const progressColor = resolveColor('progress', 'normal')

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
