import React, { useState, useEffect } from 'react'
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
  const [paginationCount, setPaginationCount] = useState(exercises.length)
  const exercisesCards = exercises.map(exercise => {
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
  const config = {
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4
      }
    }
  }

  const count = exercises.length

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth >= 768 && windowWidth < 1024) {
        setPaginationCount(Math.ceil(count / 2))
      } else if (windowWidth > 1024) {
        setPaginationCount(Math.ceil(count / 4))
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [count])

  return (
    <Box
      flexGrow="1"
      {...props}
    >
      <Carousel
        height="100%"
        paddingBottom="20px"
        count={paginationCount}
        config={config}
      >{exercisesCards}</Carousel>
    </Box>
  )
}

export default ExerciseCarousel
