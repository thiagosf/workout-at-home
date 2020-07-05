import React from 'react'
import {
  Box,
  useColorMode
} from '@chakra-ui/core'
import { colors, transitions, utils } from '../../ui'

function TabBarBackground ({ children, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const background = valueByMode(
    colors.blue800,
    colors.blue800,
    colorMode
  )
  return (
    <Box
      transition={transitions.common}
      background={background}
      padding="15px 10px 10px 10px"
      style={{
        clipPath: "ellipse(100% 85px at 50% 85px)"
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default TabBarBackground
