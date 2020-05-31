import React, { useState } from 'react'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { NumberControl } from '../NumberControl'
import { colors } from '../../ui'

function RestBetweenExercises ({
  initialData = {},
  onChange,
  ...props
}) {
  const [model, setModel] = useState({
    seconds: 30,
    ...initialData
  })

  const allColors = {
    color: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    }
  }

  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const color = resolveColor('color', 'normal')

  const handleChange = value => {
    const newModel = {
      ...model,
      seconds: value
    }
    setModel(newModel)
    onChange(newModel)
  }

  return (
    <Flex
      alignItems="center"
      color={color}
      {...props}
    >
      <Text
        color={color}
        flexGrow="1"
        margin="0 10px 0 0"
      >Rest in <Text as="strong">seconds</Text> between exercises:</Text>
      <NumberControl
        initialValue={model.seconds}
        onChange={handleChange}
      />
    </Flex>
  )
}

export default RestBetweenExercises
