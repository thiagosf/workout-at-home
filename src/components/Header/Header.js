import React from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { Logo } from '../Logo'
import { ColorModeSwitch } from '../ColorModeSwitch'

function Header ({
  colorMode,
  onColorModeSwitch,
  ...props
}) {
  return (
    <Flex
      alignItems="center"
      {...props}
    >
      <Box flexGrow="1">
        <Logo />
      </Box>
      <ColorModeSwitch
        isChecked={colorMode === 'dark'}
        onChange={onColorModeSwitch}
      />
    </Flex>
  )
}

export default Header
