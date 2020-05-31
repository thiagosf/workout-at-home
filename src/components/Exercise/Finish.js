import React from 'react'
import {
  Flex,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function Finish ({
  ...props
}) {
  const allColors = {
    yeah: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    waterText: {
      normal: {
        light: colors.gray500,
        dark: colors.gray400
      }
    },
    waterIcon: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    seeYou: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    }
  }

  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const yeahColor = resolveColor('yeah', 'normal')
  const waterTextColor = resolveColor('waterText', 'normal')
  const waterIconColor = resolveColor('waterIcon', 'normal')
  const seeYouColor = resolveColor('seeYou', 'normal')

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Text
        lineHeight="1"
        color={yeahColor}
        fontSize="70px"
        margin="0 0 10px 0"
        fontWeight="600"
      >Yeahhh!</Text>
      <Text
        lineHeight="1"
        color={waterTextColor}
        fontSize="20px"
        margin="0 0 20px 0"
      >How about some water?!</Text>
      <Icon
        name="waterGlass"
        size="220px"
        color={waterIconColor}
      />
      <Text
        lineHeight="1"
        color={seeYouColor}
        fontSize="30px"
        margin="0 0 10px 0"
      >See you tomorrow!</Text>
    </Flex>
  )
}

export default Finish
