import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions, utils } from '../../ui'
import { Badge } from '../Badge'

function TabBarButton ({ children, icon, onClick, counter, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const backgroundActive = valueByMode(
    colors.whiteOpacity200,
    colors.whiteOpacity200,
    colorMode
  )
  const iconSize = counter === undefined
    ? '26px'
    : '16px'
  const iconMarginRight = counter === undefined
    ? '0'
    : '5px'
  return (
    <PseudoBox
      onClick={onClick}
      as="button"
      border="0"
      rounded="3px"
      padding="5px"
      transition={transitions.common}
      background={colors.transparent}
      outline="0"
      _active={{
        background: backgroundActive
      }}
      {...props}
    >
      <Box
        padding="0px 5px 5px 5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon
          name={icon}
          color={colors.white}
          size={iconSize}
          marginRight={iconMarginRight}
        />
        {counter !== undefined &&
          <Badge
            background={colors.green500}
            textColor={colors.white}
          >{counter}</Badge>
        }
      </Box>
      <Text
        margin="0"
        fontSize="16px"
        lineHeight="1"
        color={colors.white}
        textAlign="center"
      >{children}</Text>
    </PseudoBox>
  )
}

export default TabBarButton
