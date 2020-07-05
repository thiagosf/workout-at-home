import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions, utils } from '../../ui'

function TabBarMainButton ({
  children,
  icon,
  count,
  onClick,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const background = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )
  const backgroundActive = valueByMode(
    colors.green800,
    colors.green800,
    colorMode
  )
  return (
    <PseudoBox
      onClick={onClick}
      as="button"
      border="0"
      rounded="full"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      padding="10px 20px 10px 30px"
      transition={transitions.common}
      background={background}
      outline="0"
      _active={{
        background: backgroundActive
      }}
      {...props}
    >
      <Text
        as="span"
        marginRight="15px"
        fontSize="32px"
        color={colors.white}
      >{children}</Text>
      <Box
        rounded="full"
        background={colors.white}
        padding="5px"
      >
        {!icon && count !== undefined &&
          <Text
            as="span"
            color={colors.red500}
            fontSize="20px"
            minWidth="30px"
            display="inline-block"
          >{count}</Text>
        }
        {icon &&
          <Icon
            name={icon}
            color={colors.red500}
            size="26px"
          />
        }
      </Box>
    </PseudoBox>
  )
}

export default TabBarMainButton
