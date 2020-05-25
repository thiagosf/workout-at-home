import React from 'react'
import { Box } from '@chakra-ui/core'
import { Carousel } from '../Carousel'
import MuscleGroupCount from './MuscleGroupCount'

function MuscleGroup ({ onSelect, muscleGroups }) {
  const items = muscleGroups.map((item, index) => {
    return (
      <Box
        key={index}
        display="inline-block"
        width="auto"
      >
        <MuscleGroupCount
          active={item.active}
          name={item.name}
          count={item.count}
          onClick={onSelect}
        />
      </Box>
    )
  })

  return (
    <Carousel
      config={{
        slidesPerView: 'auto',
        spaceBetween: 10
      }}
    >
      {items}
    </Carousel>
  )
}

export default MuscleGroup
