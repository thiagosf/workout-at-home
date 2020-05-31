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
import { colors } from '../../ui'

const MediaTypeRadio = React.forwardRef((props, ref) => {
  const { colorMode } = useColorMode()
  const { isChecked, isDisabled, value, ...rest } = props
  const allColors = {
    color: {
      normal: {
        light: colors.white,
        dark: colors.white
      },
      active: {
        light: colors.white,
        dark: colors.white
      }
    },
    background: {
      normal: {
        light: colors.blue400,
        dark: colors.blue400
      },
      active: {
        light: colors.blue800,
        dark: colors.blue800
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = isChecked ? 'active' : 'normal'
  const color = resolveColor('color')
  const background = resolveColor('background')
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

  return (
    <ExerciseCard
      color={color}
      {...props}
    >
      <Flex
        alignItems="center"
      >
        {dragHandle}
        <ExerciseHeader
          {...exercise}
          visible={{
            likes: false,
            level: false,
            name: true,
            muscleGroups: true,
            requirements: false
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
              defaultValue="reps"
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
            initialValue={15}
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
