import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions } from '../../ui'
import { Badge } from '../Badge'

function TabBarButton ({ children, icon, onClick, counter }) {
  const { colorMode } = useColorMode()
  const allColors = {
    backgroundActive: {
      normal: {
        light: colors.whiteOpacity200,
        dark: colors.whiteOpacity200
      }
    }
  }
  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const backgroundActive = resolveColor('backgroundActive')
  return (
    <PseudoBox
      onClick={onClick}
      as="button"
      border="0"
      rounded="3px"
      transition={transitions.common}
      background={colors.transparent}
      outline="0"
      _active={{
        background: backgroundActive
      }}

    >
      <Box
        padding="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon
          name={icon}
          color={colors.white}
          size="16px"
          marginRight="5px"
        />
        <Badge
          background={colors.green500}
          textColor={colors.white}
        >{counter}</Badge>
      </Box>
      <Text
        margin="0"
        fontSize="16px"
        color={colors.white}
        textAlign="center"
      >{children}</Text>
    </PseudoBox>
  )
}

export default TabBarButton
