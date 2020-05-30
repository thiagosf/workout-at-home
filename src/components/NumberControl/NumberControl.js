import React, { useState } from 'react'
import {
  Flex,
  Button,
  Icon,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function NumberControl ({
  initialValue,
  onChange,
  ...props
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    plus: {
      normal: {
        light: colors.green800,
        dark: colors.green200
      }
    },
    minus: {
      normal: {
        light: colors.red800,
        dark: colors.red200
      }
    },
    backgroundPlus: {
      normal: {
        light: colors.green200,
        dark: colors.green800
      }
    },
    backgroundMinus: {
      normal: {
        light: colors.red200,
        dark: colors.red800
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const plusColor = resolveColor('plus', 'normal')
  const blusBackgroundColor = resolveColor('backgroundPlus', 'normal')
  const minusColor = resolveColor('minus', 'normal')
  const minusBackgroundColor = resolveColor('backgroundMinus', 'normal')
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
        background={blusBackgroundColor}
        _hover={{
          background: blusBackgroundColor
        }}
        _active={{
          background: blusBackgroundColor
        }}
      >
        <Icon name="add" size="12px" />
      </Button>
      <Text
        margin="0 5px"
        fontSize="18px"
        fontWeight="600"
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
