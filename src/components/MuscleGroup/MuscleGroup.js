import React from 'react'
import { Box } from '@chakra-ui/core'
import { Carousel } from '../Carousel'
import MuscleGroupCount from './MuscleGroupCount'

function MuscleGroup ({ onSelect, muscleGroups, ...props }) {
  const items = muscleGroups.map((item, index) => {
    return (
      <Box
        key={index}
        display="inline-block"
        width="auto"
        padding="0 0 0 10px"
      >
        <MuscleGroupCount
          active={item.active}
          name={item.name}
          count={item.count}
          onClick={() => onSelect(item)}
        />
      </Box>
    )
  })

  return (
    <Carousel
      config={{
        slidesPerView: 'auto'
      }}
      {...props}
    >
      {items}
    </Carousel>
  )
}

export default MuscleGroup
