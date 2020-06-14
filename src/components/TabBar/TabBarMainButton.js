import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions } from '../../ui'

function TabBarMainButton ({
  children,
  icon,
  count,
  onClick,
  ...props
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    background: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    },
    backgroundActive: {
      normal: {
        light: colors.green800,
        dark: colors.green800
      }
    }
  }
  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const background = resolveColor('background')
  const backgroundActive = resolveColor('backgroundActive')
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
