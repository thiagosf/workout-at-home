import React from 'react'
import { Flex, Box, LightMode, DarkMode } from '@chakra-ui/core'
import { colors } from '../ui'

export const withColorMode = storyFn => {
  return (
    <Flex
      flexDirection={["column", "row"]}
    >
      <LightMode>
        {withLight(storyFn)}
      </LightMode>
      <DarkMode>
        {withDark(storyFn)}
      </DarkMode>
    </Flex>
  )
}

export const withLight = storyFn => {
  return (
    <Box
      padding="10px"
      background={colors.gray200}
      display="block"
      width={["100%", "50%"]}
      boxSizing="border-box"
    >
      {storyFn()}
    </Box>
  )
}

export const withDark = storyFn => {
  return (
    <Box
      padding="10px"
      background={colors.gray900}
      display="block"
      width={["100%", "50%"]}
      boxSizing="border-box"
    >
      {storyFn()}
    </Box>
  )
}
