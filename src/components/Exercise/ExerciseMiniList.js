import React, { useState } from 'react'
import {
  Flex,
  Box,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import ExerciseMiniControls from './ExerciseMiniControls'
import { colors } from '../../ui'

const DragHandle = sortableHandle(({ color }) =>
  <Flex
    margin="0 0 0 -25px"
    padding="0 15px 0 10px"
    alignSelf="stretch"
    alignItems="center"
  >
    <Icon size="20px" name="drag-handle" color={color} />
  </Flex>
)

const SortableItem = sortableElement(({ children }) => (
  <Box>
    {children}
  </Box>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <Box>{children}</Box>
})

function ExerciseMiniList ({
  exercises,
  onChange
}) {
  const [model, setModel] = useState(
    exercises.map((exercise, index) => ({
      count: 15,
      count_type: 'reps',
      exercise_id: exercise.id,
      sort: index,
      exercise
    }))
  )

  const handleSort = ({ oldIndex, newIndex }) => {
    const newModel = arrayMove(model, oldIndex, newIndex)
      .map((item, index) => ({ ...item, sort: index }))
    setModel(newModel)
    sendChanges(newModel)
  }

  const handleChange = item => {
    const newModel = model.map(exercise => {
      if (exercise.exercise_id === item.exercise_id) {
        return { ...exercise, ...item }
      }
      return exercise
    })
    setModel(newModel)
    sendChanges(newModel)
  }

  const sendChanges = newModel => {
    onChange(
      newModel.map(({ exercise, ...other }) => ({
        ...other
      }))
    )
  }

  const { colorMode } = useColorMode()
  const allColors = {
    dragHandle: {
      normal: {
        light: colors.gray300,
        dark: colors.gray600
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const dragHandleColor = resolveColor('dragHandle', 'normal')

  const exercisesMiniControls = model.map((item, index) => {
    return (
      <SortableItem
        key={`sortable-item-${item.exercise.id}`}
        index={index}
      >
        <ExerciseMiniControls
          margin="10px 0"
          onChange={handleChange}
          exercise={item.exercise}
          dragHandle={<DragHandle color={dragHandleColor} />}
        />
      </SortableItem>
    )
  })

  return (
    <Box margin="-10px 0">
      <SortableContainer
        onSortEnd={handleSort}
        lockAxis="y"
        useDragHandle
      >
        {exercisesMiniControls}
      </SortableContainer>
    </Box>
  )
}

export default ExerciseMiniList
