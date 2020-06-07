import React from 'react'
import {
  Flex,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function MuscleGroupBody ({
  muscleGroups,
  ...props
}) {
  const allColors = {
    primary: {
      normal: {
        light: colors.red800,
        dark: colors.red800
      }
    },
    secondary: {
      normal: {
        light: colors.red300,
        dark: colors.red300
      }
    },
    silhouette: {
      normal: {
        light: colors.white,
        dark: colors.white
      }
    },
    base: {
      normal: {
        light: '#F2E4E2',
        dark: '#F2E4E2'
      }
    }
  }

  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const primaryColor = resolveColor('primary', 'normal')
  const secondaryColor = resolveColor('secondary', 'normal')
  const silhouetteColor = resolveColor('silhouette', 'normal')
  const baseColor = resolveColor('base', 'normal')
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
      'Abs': '--abs',
      'Triceps': '--triceps',
      'Neck': '--neck',
      'Chest': '--chest',
      'Back': '--back',
      'Biceps': '--biceps',
      'Forearms': '--forearms',
      'Shoulders': '--shoulders',
      'Front leg': '--front-leg',
      'Back leg': '--back-leg',
      'Calves': '--calves',
      'Trapezoids': '--trapezoids',
      'Gluteos': '--gluteos'
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
