import React, { useState } from 'react'
import {
  Flex,
  Button,
  Icon,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function NumberControl ({
  initialValue,
  onChange,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const plusColor = valueByMode(
    colors.green800,
    colors.green200,
    colorMode
  )
  const minusColor = valueByMode(
    colors.red800,
    colors.red200,
    colorMode
  )
  const plusBackgroundColor = valueByMode(
    colors.green200,
    colors.green800,
    colorMode
  )
  const minusBackgroundColor = valueByMode(
    colors.red200,
    colors.red800,
    colorMode
  )
  const textBackgroundColor = valueByMode(
    colors.gray200,
    colors.gray900,
    colorMode
  )
  const [value, setValue] = useState(initialValue)

  const increment = () => {
    const newValue = value + 1
    setValue(newValue)
    onChange(newValue)
  }

  const decrement = () => {
    const newValue = value - 1
    if (newValue >= 0) {
      setValue(newValue)
      onChange(newValue)
    }
  }

  return (
    <Flex
      alignItems="center"
      {...props}
    >
      <Button
        size="sm"
        onClick={increment}
        rounded="full"
        color={plusColor}
        background={plusBackgroundColor}
        _hover={{
          background: plusBackgroundColor
        }}
        _active={{
          background: plusBackgroundColor
        }}
      >
        <Icon name="add" size="12px" />
      </Button>
      <Text
        margin="0 5px"
        fontSize="18px"
        fontWeight="600"
        background={textBackgroundColor}
        padding="5px 5px"
        minWidth="35px"
        rounded="2px"
        lineHeight="1"
        textAlign="center"
      >{value}</Text>
      <Button
        size="sm"
        onClick={decrement}
        rounded="full"
        color={minusColor}
        background={minusBackgroundColor}
        _hover={{
          background: minusBackgroundColor
        }}
        _active={{
          background: minusBackgroundColor
        }}
      >
        <Icon name="minus" size="12px" />
      </Button>
    </Flex>
  )
}

export default NumberControl
