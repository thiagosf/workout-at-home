import React from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { Logo } from '../Logo'
import { ColorModeSwitch } from '../ColorModeSwitch'

function Header () {
  return (
    <Flex
      alignItems="center"
    >
      <Box flexGrow="1">
        <Logo />
      </Box>
      <ColorModeSwitch />
    </Flex>
  )
}

export default Header
