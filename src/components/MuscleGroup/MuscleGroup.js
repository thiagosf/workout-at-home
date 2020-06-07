import React from 'react'
import { Box } from '@chakra-ui/core'
import { Carousel } from '../Carousel'
import MuscleGroupCount from './MuscleGroupCount'

function MuscleGroup ({ onSelect, muscleGroups, ...props }) {
  const lastIndex = muscleGroups.length - 1
  const items = muscleGroups.map((item, index) => {
    const padding = index === 0
      ? '0 0 0 10px'
      : index === lastIndex
        ? '0 10px 0 0'
        : ''
    return (
      <Box
        key={index}
        display="inline-block"
        width="auto"
        padding={padding}
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
        slidesPerView: 'auto',
        spaceBetween: 10
      }}
      {...props}
    >
      {items}
    </Carousel>
  )
}

export default MuscleGroup
