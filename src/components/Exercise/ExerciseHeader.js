import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  useColorMode,
  Flex
} from '@chakra-ui/core'
import { colors } from '../../ui'
import ExerciseHeaderIcon from './ExerciseHeaderIcon'

function ExerciseHeader ({
  name,
  level,
  likes,
  muscleGroups,
  requirements,
  ...props
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    name: {
      normal: {
        light: colors.gray800,
        dark: colors.gray200
      }
    },
    muscleColor: {
      normal: {
        light: colors.gray400,
        dark: colors.gray200
      }
    },
    mainMuscleColor: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    },
    requirementColor: {
      normal: {
        light: colors.gray400,
        dark: colors.gray500
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = 'normal'
  const nameColor = resolveColor('name')
  const muscleColor = resolveColor('muscleColor')
  const mainMuscleColor = resolveColor('mainMuscleColor')
  const requirementColor = resolveColor('requirementColor')
  const showLikes = likes !== undefined && likes !== null

  const requirementsString = requirements.map(i => i.name)
    .join(', ')
  const totalMuscleGroups = +muscleGroups.length - 1
  const muscleGroupsItems = muscleGroups.map((item, index) => {
    const itemTag = item.primary ? 'strong' : 'span'
    const styles = item.primary
      ? {
        borderBottom: '2px solid'
      }
      : {}
    const after = +index < totalMuscleGroups
      ? {
          content: '" • "',
          display: 'inline-block',
          margin: '0 8px',
          color: muscleColor
      }
      : null
    const _muscleColor = item.primary ? mainMuscleColor : muscleColor
    return (
      <PseudoBox
        key={index}
        _after={after}
        display="flex"
        alignItems="center"
      >
        <Text
          margin="0"
          color={_muscleColor}
        >
          <Box
            as={itemTag}
            display="inline-block"
            lineHeight="1"
            {...styles}
          >{item.name}</Box>
        </Text>
      </PseudoBox>
    )
  })
  return (
    <Flex {...props}>
      <Box
        flexGrow="1"
        marginRight="20px"
      >
        <Text
          fontSize="20px"
          margin="0"
          fontWeight="600"
          lineHeight="1.2"
          color={nameColor}
        >{name}</Text>
        <Flex
          margin="0 0 10px 0"
          flexWrap="wrap"
        >
          {muscleGroupsItems}
        </Flex>
        <Text
          margin="0"
          fontSize="14px"
          color={requirementColor}
        >
          Requires: <strong>{requirementsString}</strong>
        </Text>
      </Box>
      <Flex>
        <Box>
          <ExerciseHeaderIcon
            icon="level"
          >{level}</ExerciseHeaderIcon>
        </Box>
        {showLikes &&
          <Box marginLeft="10px">
            <ExerciseHeaderIcon
              icon="heart"
            >{likes}</ExerciseHeaderIcon>
          </Box>
        }
      </Flex>
    </Flex>
  )
}

export default ExerciseHeader
