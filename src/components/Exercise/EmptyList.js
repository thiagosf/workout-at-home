import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function EmptyList ({ props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const textColor = valueByMode(
    colors.gray400,
    colors.gray500,
    colorMode
  )
  const iconColor = valueByMode(
    colors.gray400,
    colors.gray500,
    colorMode
  )

  return (
    <Box
      textAlign="center"
    >
      <Text
        fontSize="22px"
        color={textColor}
        margin="0 0 10px 0"
      >Your list is empty!</Text>
      <Icon
        name="empty"
        size="100px"
        color={iconColor}
      />
    </Box>
  )
}

export default EmptyList
