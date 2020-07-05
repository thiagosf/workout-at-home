import React from 'react'
import {
  PseudoBox,
  Box,
  Text,
  useColorMode,
  Flex
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'
import ExerciseHeaderIcon from './ExerciseHeaderIcon'

function ExerciseHeader ({
  name,
  level,
  likes,
  muscleGroups = [],
  requirements = [],
  visible = {
    likes: true,
    level: true,
    name: true,
    muscleGroups: true,
    requirements: true
  },
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const nameColor = valueByMode(
    colors.gray800,
    colors.gray200,
    colorMode
  )
  const muscleColor = valueByMode(
    colors.gray400,
    colors.gray200,
    colorMode
  )
  const mainMuscleColor = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )
  const requirementColor = valueByMode(
    colors.gray400,
    colors.gray500,
    colorMode
  )

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
        {visible.name &&
          <Text
            fontSize="20px"
            margin="0"
            fontWeight="600"
            lineHeight="1"
            color={nameColor}
          >{name}</Text>
        }
        {visible.muscleGroups &&
          <Flex
            flexWrap="wrap"
          >
            {muscleGroupsItems}
          </Flex>
        }
        {visible.requirements &&
          <Text
            margin="5px 0 0 0"
            fontSize="14px"
            color={requirementColor}
          >
            Requires: <strong>{requirementsString}</strong>
          </Text>

        }
      </Box>
      <Flex>
        {visible.level &&
          <Box>
            <ExerciseHeaderIcon
              icon="level"
            >{level}</ExerciseHeaderIcon>
          </Box>
        }
        {showLikes && visible.likes &&
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
