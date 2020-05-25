import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { Badge } from '../Badge'
import { colors, transitions } from '../../ui'

function MuscleGroupCount ({ active, name, count, onClick, ...props }) {
  const { colorMode } = useColorMode()
  const allColors = {
    text: {
      normal: {
        light: colors.black,
        dark: colors.gray500
      },
      active: {
        light: colors.green500,
        dark: colors.green500
      }
    },
    background: {
      normal: {
        light: colors.transparent,
        dark: colors.transparent
      },
      active: {
        light: colors.white,
        dark: colors.gray800
      }
    },
    backgroundActive: {
      normal: {
        light: colors.white,
        dark: colors.gray800
      },
      active: {
        light: colors.white,
        dark: colors.gray800
      }
    },
    badgeText: {
      normal: {
        light: colors.white,
        dark: colors.white
      },
      active: {
        light: colors.white,
        dark: colors.gray800
      }
    },
    badgeBackground: {
      normal: {
        light: colors.black,
        dark: colors.gray800
      },
      active: {
        light: colors.green500,
        dark: colors.green500
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = !active ? 'normal' : 'active'
  const textColor = resolveColor('text')
  const backgroundColor = resolveColor('background')
  const backgroundColorActive = resolveColor('backgroundActive')
  const badgeTextColor = resolveColor('badgeText')
  const badgeBackgroundColor = resolveColor('badgeBackground')

  return (
    <PseudoBox
      as="button"
      padding="5px 15px "
      onClick={onClick}
      transition={transitions.common}
      borderRadius="5px"
      background={backgroundColor}
      justifyContent="center"
      display="flex"
      width="100%"
      border="0"
      outline="0"
      _active={{
        background: backgroundColorActive
      }}
      {...props}
    >
      <Box
        textAlign="center"
        pointerEvents="none"
      >
        <Text
          transition={transitions.common}
          fontSize="20px"
          margin="0 0 5px 0"
          fontWeight="600"
          color={textColor}
        >{name}</Text>
        <Badge
          background={badgeBackgroundColor}
          textColor={badgeTextColor}
        >{count}</Badge>
      </Box>
    </PseudoBox>
  )
}

export default MuscleGroupCount
