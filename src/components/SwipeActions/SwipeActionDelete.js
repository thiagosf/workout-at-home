import React from 'react'
import {
  Box,
  Flex,
  Button,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function SwipeActionDelete ({
  onDelete,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const buttonBackground = valueByMode(
    colors.red500,
    colors.red500,
    colorMode
  )
  const buttonBackgroundActive = valueByMode(
    colors.red300,
    colors.red800,
    colorMode
  )
  const buttonColor = valueByMode(
    colors.white,
    colors.white,
    colorMode
  )
  return (
    <Box
      width="100px"
      {...props}
    >
      <Flex
        height="60px"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          background={buttonBackground}
          color={buttonColor}
          rounded="5px"
          _hover={{ background: buttonBackground }}
          _active={{ background: buttonBackgroundActive }}
          _focus={{ background: buttonBackgroundActive }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  )
}

export default SwipeActionDelete
