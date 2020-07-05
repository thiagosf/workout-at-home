import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function ExerciseHeaderIcon ({ icon, children, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const textColor = valueByMode(
    colors.gray800,
    colors.gray200,
    colorMode
  )
  const iconColor = valueByMode(
    colors.gray800,
    colors.gray200,
    colorMode
  )

  return (
    <Box
      textAlign="center"
      {...props}
    >
      <Icon
        name={icon}
        color={iconColor}
        size="26px"
        marginBottom="3px"
      />
      <Text
        fontWeight="600"
        fontSize="16px"
        margin="0"
        color={textColor}
      >{children}</Text>
    </Box>
  )
}

export default ExerciseHeaderIcon
