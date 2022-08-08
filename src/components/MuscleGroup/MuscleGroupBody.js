import React from 'react'
import {
  Flex,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function MuscleGroupBody ({
  muscleGroups,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const primaryColor = valueByMode(
    colors.red800,
    colors.red800,
    colorMode
  )
  const secondaryColor = valueByMode(
    colors.red300,
    colors.red300,
    colorMode
  )
  const silhouetteColor = valueByMode(
    colors.white,
    colors.white,
    colorMode
  )
  const baseColor = valueByMode(
    '#F2E4E2',
    '#F2E4E2',
    colorMode
  )

  const muscleGroupColors = {
    '--silhouette': silhouetteColor,
    '--base': baseColor,
    '--abs': baseColor,
    '--triceps': baseColor,
    '--neck': baseColor,
    '--chest': baseColor,
    '--back': baseColor,
    '--biceps': baseColor,
    '--forearms': baseColor,
    '--shoulders': baseColor,
    '--front-leg': baseColor,
    '--back-leg': baseColor,
    '--calves': baseColor,
    '--trapezoids': baseColor,
    '--gluteos': baseColor,
  }

  const translateName = name => {
    const items = {
      'Abs': '--abs', // id: ?
      'Triceps': '--triceps', // id: ?
      'Neck': '--neck', // id: ?
      'Chest': '--chest', // id: ?
      'Back': '--back', // id: ?
      'Biceps': '--biceps', // id: 12
      'Forearms': '--forearms', // id: ?
      'Shoulders': '--shoulders', // id: 3
      'Front leg': '--front-leg', // id: ?
      'Back leg': '--back-leg', // id: ?
      'Calves': '--calves', // id: ?
      'Trapezoids': '--trapezoids', // id: 11
      'Gluteos': '--gluteos', // id: 8
    }
    return items[name]
  }

  for (const muscleGroup of muscleGroups) {
    const name = translateName(muscleGroup.name)
    muscleGroupColors[name] = muscleGroup.primary
      ? primaryColor
      : secondaryColor
  }

  return (
    <Flex
      {...props}
    >
      <Icon
        name="body"
        size="100%"
        style={muscleGroupColors}
      />
    </Flex>
  )
}

export default MuscleGroupBody
