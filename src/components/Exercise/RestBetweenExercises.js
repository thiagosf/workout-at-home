import React, { useState } from 'react'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { NumberControl } from '../NumberControl'
import { colors, utils } from '../../ui'

function RestBetweenExercises ({
  initialData = {},
  onChange,
  ...props
}) {
  const [model, setModel] = useState({
    seconds: 30,
    ...initialData
  })

  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const color = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )

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
