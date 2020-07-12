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
    // const count = selecteds.includes(+exercise.id)
    const count = selecteds.filter(id => id === +exercise.id).length
    const added = false
    return (
      <Box
        padding="5px 10px"
        key={exercise.id}
      >
        <Exercise
          height="100%"
          exercise={exercise}
          added={added}
          count={count}
          onSelect={() => onSelect(exercise)}
          insideCarousel
        />
      </Box>
    )
  })
  return (
    <Box
      flexGrow="1"
      {...props}
    >
      <Carousel
        height="100%"
        paddingBottom="20px"
        count={exercises.length}
      >{exercisesCards}</Carousel>
    </Box>
  )
}

export default ExerciseCarousel
