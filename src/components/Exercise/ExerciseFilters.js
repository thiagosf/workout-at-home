import React, { useState } from 'react'
import {
  Flex,
  Box,
  Checkbox,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function ExerciseFilters ({
  equipaments,
  onChange,
  selecteds = [],
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const textColor = valueByMode(
    colors.gray800,
    colors.gray300,
    colorMode
  )
  const backgroundColor = valueByMode(
    colors.white,
    colors.gray900,
    colorMode
  )

  const [checkedItems, setCheckedItems] = useState(selecteds)
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
          if (e.target.value.toLowerCase() !== 'all') {
            items.delete('all')
            if (items.has(e.target.value)) {
              items.delete(e.target.value)
            } else {
              items.add(e.target.value)
            }
          } else {
            if (e.target.checked) {
              items = new Set(equipaments.map(i => i.value))
            } else {
              items = new Set([])
            }
          }
          if (items.size === (equipaments.length - 1)) {
            items.add('all')
          }
          items = [...items]
          setCheckedItems(items)
          onChange(items)
        }}
      >{equipament.label}</Checkbox>
    )
  })

  return (
    <Box
      color={textColor}
      background={backgroundColor}
      padding="20px"
      {...props}
    >
      <Text
        fontSize="sm"
        margin="0 0 10px 0"
      >Filter equipaments:</Text>
      <Flex
        flexDirection="column"
      >
        {checks}
      </Flex>
    </Box>
  )
}

export default ExerciseFilters
