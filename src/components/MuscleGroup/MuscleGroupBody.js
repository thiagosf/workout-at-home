import React from 'react'
import { Box, Image } from '@chakra-ui/core'

const MuscleGroupBody = ({ muscleGroups, ...props }) => {
  // const { colorMode } = useColorMode()
  return (
    <Box {...props}>
      <Image
        alt=""
        src="https://via.placeholder.com/550x550"
        maxWidth={["50px", "100px"]}
      />
    </Box>
  )
}

export default MuscleGroupBody
