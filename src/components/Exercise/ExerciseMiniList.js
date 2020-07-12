import React, { useState } from 'react'
import { Box } from '@chakra-ui/core'
import ExerciseMiniControls from './ExerciseMiniControls'
import { Sortable } from '../Sortable'
import { ComposableMoveUp } from '../Animations'
import { SwipeActions, SwipeActionDelete } from '../SwipeActions'
import { delay } from '../../utils'

function ListItem ({ handle, item, onDelete, handleChange }) {
  const [visible, setVisible] = useState(true)
  const handleDelete = async () => {
    setVisible(false)
    await delay(600)
    onDelete()
  }
  return (
    <ComposableMoveUp.Item>
      <SwipeActions
        visible={visible}
        context={<SwipeActionDelete onDelete={handleDelete} />}
      >
        <ExerciseMiniControls
          index={item.code}
          margin="5px 0"
          padding="10px 20px"
          onChange={handleChange}
          exercise={item.exercise}
          initialData={item.data}
          dragHandle={handle}
        />
      </SwipeActions>
    </ComposableMoveUp.Item>
  )
}

function ExerciseMiniList ({
  exercises,
  onChange,
  onDelete,
  ...props
}) {
  const [model, setModel] = useState(
    exercises.map((item, index) => ({
      exercise: item.exercise,
      data: item.data,
      sort: +index
    }))
  )
  const handleListChange = items => {
    let newModel = [...model]
    for (const index in items) {
      const item = items[index]
      newModel = newModel.map(modelItem => {
        if (+modelItem.exercise.id === +item.id) {
          modelItem.sort = +index
        }
        return modelItem
      })
    }
    newModel.sort((a, b) => {
      if (a.sort < b.sort) return -1
      if (a.sort > b.sort) return 1
      return 0
    })
    setModel(newModel)
    sendChanges(newModel)
  }

  const handleChange = item => {
    const newModel = model.map(_item => {
      if (_item.exercise.id === item.exercise_id) {
        _item.data = { ...item }
      }
      return _item
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

  const items = model.map(item => {
    return {
      id: item.data.code,
      item,
      component: function ({ handle }) {
        const handleDelete = () => {
          onDelete(item)
        }
        return (
          <ListItem
            key={`sortable-item-${item.data.code}`}
            item={item}
            handle={handle}
            handleChange={handleChange}
            onDelete={handleDelete}
          />
        )
      }
    }
  })

  return (
    <Box
      margin="-10px 0"
      padding="0 0 50px 0"
      {...props}
    >
      <ComposableMoveUp.Container>
        <Sortable
          items={items}
          onChange={handleListChange}
        />
      </ComposableMoveUp.Container>
    </Box>
  )
}

export default ExerciseMiniList
