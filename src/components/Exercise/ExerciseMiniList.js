import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import ExerciseMiniControls from './ExerciseMiniControls'
import { Sortable } from '../Sortable'

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}

const itemContainer = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { ease: 'circOut' }
    }
  },
  hidden: {
    y: 50,
    opacity: 0
  }
}

const MotionContainer = motion.custom(Box)
const MotionBox = motion.custom(Box)

function ExerciseMiniList ({
  exercises,
  onChange,
  ...props
}) {
  const [model, setModel] = useState(
    exercises.map((item, index) => ({
      exercise: item.exercise,
      data: item.data,
      sort: +index
    }))
  )

  const handleChange = items => {
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

  const sendChanges = newModel => {
    onChange(
      newModel.map(({ exercise, ...other }) => ({
        ...other
      }))
    )
  }

  // const itemControls = useAnimation()

  const items = model.map((item, index) => {
    return {
      id: item.exercise.id,
      item,
      component: ({ handle }) => (
        <MotionBox
          key={`sortable-item-${item.exercise.id}`}
          variants={itemContainer}
        >
          <ExerciseMiniControls
            index={index}
            margin="5px 0"
            padding="10px 20px"
            onChange={handleChange}
            exercise={item.exercise}
            initialData={item.data}
            dragHandle={handle}
          />
        </MotionBox>
      )
    }
  })

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <Box
      margin="-10px 0"
      padding="0 0 50px 0"
      {...props}
    >
      <MotionContainer
        initial={false}
        animate={visible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Sortable
          items={items}
          onChange={handleChange}
        />
      </MotionContainer>
    </Box>
  )
}

export default ExerciseMiniList
