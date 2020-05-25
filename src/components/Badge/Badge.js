import React from 'react'
import {
  Badge as ChrakraBadge,
  Text
} from '@chakra-ui/core'
import { transitions } from '../../ui'

function Badge ({ children, background, textColor }) {
  return (
    <ChrakraBadge
      transition={transitions.common}
      background={background}
      padding="0px 5px"
      fontWeight="400"
      fontSize="14px"
      rounded="full"
      lineHeight="28px"
      minWidth="28px"
    >
      <Text
        transition={transitions.common}
        fontSize="14px"
        margin="0"
        fontWeight="400"
        color={textColor}
      >{children}</Text>
    </ChrakraBadge>
  )
}

export default Badge
