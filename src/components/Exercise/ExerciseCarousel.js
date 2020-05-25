import React from 'react'
import {
  Box
} from '@chakra-ui/core'
import Exercise from './Exercise'
import { Carousel } from '../Carousel'

function ExerciseCarousel ({
  onSelect,
  selecteds = [],
  exercises,
  ...props
}) {
  const exercisesCards = exercises.map(exercise => {
    const added = selecteds.includes(+exercise.id)
    return (
      <Box
        padding="5px 10px"
        key={exercise.id}
      >
        <Exercise
          exercise={exercise}
          added={added}
          onSelect={() => onSelect(exercise)}
          insideCarousel
        />
      </Box>
    )
  })
  return (
    <Box
      {...props}
    >
      <Carousel
        count={exercises.length}
        config={{ autoHeight: true }}
      >{exercisesCards}</Carousel>
    </Box>
  )
}

export default ExerciseCarousel
