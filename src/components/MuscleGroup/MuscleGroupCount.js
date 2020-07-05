import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { Badge } from '../Badge'
import { colors, transitions, utils } from '../../ui'

function MuscleGroupCount ({ active, name, count, onClick, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const textColor = valueByMode(
    !active ? colors.black : colors.green500,
    !active ? colors.gray500 : colors.green500,
    colorMode
  )
  const backgroundColor = valueByMode(
    !active ? colors.transparent : colors.white,
    !active ? colors.transparent : colors.gray800,
    colorMode
  )
  const backgroundColorActive = valueByMode(
    !active ? colors.white : colors.white,
    !active ? colors.gray800 : colors.gray800,
    colorMode
  )
  const badgeTextColor = valueByMode(
    !active ? colors.white : colors.white,
    !active ? colors.white : colors.gray800,
    colorMode
  )
  const badgeBackgroundColor = valueByMode(
    !active ? colors.black : colors.green500,
    !active ? colors.gray800 : colors.green500,
    colorMode
  )

  return (
    <PseudoBox
      as="button"
      padding="5px 10px "
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
          fontSize="16px"
          fontWeight="600"
          margin="0 0 2px 0"
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
