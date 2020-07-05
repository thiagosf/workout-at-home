import React, { useState } from 'react'
import {
  Flex,
  RadioButtonGroup,
  Button,
  useColorMode
} from '@chakra-ui/core'
import ExerciseCard from './ExerciseCard'
import ExerciseHeader from './ExerciseHeader'
import { NumberControl } from '../NumberControl'
import { colors, utils } from '../../ui'
import './styles.css'

const MediaTypeRadio = React.forwardRef((props, ref) => {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const { isChecked, isDisabled, value, ...rest } = props
  const color = valueByMode(
    !isChecked ? colors.white : colors.white,
    !isChecked ? colors.white : colors.white,
    colorMode
  )
  const background = valueByMode(
    !isChecked ? colors.blue400 : colors.blue800,
    !isChecked ? colors.blue400 : colors.blue800,
    colorMode
  )

  return (
    <Button
      ref={ref}
      background={background}
      color={color}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      size="sm"
      _hover={{
        background: background
      }}
      _active={{
        background: background
      }}
      {...rest}
    />
  )
})

function ExerciseMiniControls ({
  initialData = {},
  exercise,
  onChange,
  dragHandle,
  ...props
}) {
  const [model, setModel] = useState({
    exercise_id: exercise.id,
    count: 15,
    count_type: 'reps',
    ...initialData
  })
  const { colorMode } = useColorMode()
  const classes = [
    'exercise-card',
    `exercise-card--${colorMode}`
  ]

  return (
    <ExerciseCard
      className={classes.join(' ')}
      {...props}
    >
      <Flex
        alignItems="center"
      >
        {dragHandle}
        <ExerciseHeader
          name={exercise.name}
          level={exercise.level}
          likes={exercise.likes}
          muscleGroups={exercise.muscle_groups}
          requirements={exercise.requirements}
          visible={{
            likes: false,
            level: false,
            name: true,
            muscleGroups: true,
            requirements: true
          }}
          flexGrow="1"
        />
        <Flex
          flexDirection="column"
          alignItems="center"
          margin="0 -10px 0 0"
        >
          <Flex
            margin="0 0 10px 0"
          >
            <RadioButtonGroup
              spacing="5px"
              whiteSpace="nowrap"
              defaultValue={model.count_type}
              onChange={value => {
                const newModel = {
                  ...model,
                  count_type: value
                }
                setModel(newModel)
                onChange(newModel)
              }}
              isInline
            >
              <MediaTypeRadio value="reps">
                reps
              </MediaTypeRadio>
              <MediaTypeRadio value="secs">
                secs
              </MediaTypeRadio>
            </RadioButtonGroup>
          </Flex>
          <NumberControl
            initialValue={model.count}
            onChange={value => {
              const newModel = {
                ...model,
                count: value
              }
              setModel(newModel)
              onChange(newModel)
            }}
          />
        </Flex>
      </Flex>
    </ExerciseCard>
  )
}

export default ExerciseMiniControls
