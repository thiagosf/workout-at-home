import React from 'react'
import {
  Flex,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { ComposableScaleIn } from '../Animations'
import { colors, utils } from '../../ui'

const iconVariants = {
  visible: {
    x: 0,
    y: 0,
    rotate: 0,
    origin: 0,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 0.8
    }
  },
  hidden: {
    y: 100,
    x: 300,
    rotate: 90,
    opacity: 0,
    origin: 1000
  }
}

function Finish ({ ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const yeahColor = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const waterTextColor = valueByMode(
    colors.gray500,
    colors.gray400,
    colorMode
  )
  const waterIconColor = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const seeYouColor = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )

  return (
    <ComposableScaleIn.Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      {...props}
    >
      <ComposableScaleIn.Item>
        <Text
          lineHeight="1"
          color={yeahColor}
          fontSize="70px"
          margin="0 0 10px 0"
          fontWeight="600"
        >Yeahhh!</Text>
      </ComposableScaleIn.Item>
      <ComposableScaleIn.Item>
        <Text
          lineHeight="1"
          color={waterTextColor}
          fontSize="20px"
          margin="0 0 20px 0"
        >How about some water?!</Text>
      </ComposableScaleIn.Item>
      <Flex
        width="100%"
        overflow="hidden"
        justifyContent="center"
      >
        <ComposableScaleIn.Item
          visibleProps={iconVariants.visible}
          hiddenProps={iconVariants.hidden}
        >
          <Icon
            name="waterGlass"
            size="220px"
            color={waterIconColor}
          />
        </ComposableScaleIn.Item>
      </Flex>
      <ComposableScaleIn.Item>
        <Text
          lineHeight="1"
          color={seeYouColor}
          fontSize="30px"
          margin="0 0 10px 0"
        >See you tomorrow!</Text>
      </ComposableScaleIn.Item>
    </ComposableScaleIn.Container>
  )
}

export default Finish
