import React, { useState } from 'react'
import {
  Flex,
  Box,
  Checkbox,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function ExerciseFilters ({ equipaments, onChange }) {
  const { colorMode } = useColorMode()
  const allColors = {
    text: {
      normal: {
        light: colors.gray800,
        dark: colors.white
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const textColor = resolveColor('text')

  const [checkedItems, setCheckedItems] = useState([])
  const totalEquipaments = equipaments.length
  const checks = equipaments.map((equipament, index) => {
    const isLast = (index + 1) === totalEquipaments
    return (
      <Checkbox
        key={index}
        marginBottom={isLast ? '0' : '5px'}
        isChecked={checkedItems.includes(equipament.value)}
        value={equipament.value}
        size="lg"
        onChange={e => {
          let items = new Set([...checkedItems])
          if (e.target.value !== 'All') {
            if (items.has(e.target.value)) {
              items.delete(e.target.value)
            } else {
              items.add(e.target.value)
            }
          } else {
            if (e.target.checked) {
              items = equipaments.map(i => i.value)
            } else {
              items = []
            }
          }
          items = [...items]
          setCheckedItems(items)
          onChange(items)
        }}
      >{equipament.label}</Checkbox>
    )
  })

  return (
    <Box color={textColor}>
      <Text
        fontSize="sm"
        margin="0 0 20px 0"
      >Filter requirements:</Text>
      <Flex
        flexDirection="column"
      >
        {checks}
      </Flex>
    </Box>
  )
}

export default ExerciseFilters
