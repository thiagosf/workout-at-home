import React from 'react'
import { Box } from '@chakra-ui/core'

function AbsoluteBox ({ children, ...props }) {
  return (
    <Box
      position="absolute"
      {...props}
    >{children}</Box>
  )
}

export default AbsoluteBox
