import React, { useState } from 'react'
import {
  Flex,
  Box,
  Image,
  Skeleton,
  RadioButtonGroup,
  Button,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'
import ExerciseCard from './ExerciseCard'
import ExerciseHeader from './ExerciseHeader'
import { Carousel } from '../Carousel'
import { VideoPlayer } from '../VideoPlayer'
import { AbsoluteBox } from '../Base'
import { MuscleGroupBody } from '../MuscleGroup'

const ExerciseVideo = ({ item }) => {
  const [playing, setPlaying] = useState(false)
  return (
    <Box>
      <AbsoluteBox
        top="0"
        left="0"
        bottom="40px"
        pointerEvents={playing ? 'none' : 'initial'}
        width="40%"
      />
      <AbsoluteBox
        top="0"
        right="0"
        bottom="40px"
        pointerEvents={playing ? 'none' : 'initial'}
        width="40%"
      />
      <VideoPlayer
        url={item.url}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnd={() => setPlaying(false)}
      />
    </Box>
  )
}

const MediaTypeRadio = React.forwardRef((props, ref) => {
  const { colorMode } = useColorMode()
  const { isChecked, isDisabled, value, ...rest } = props
  const allColors = {
    color: {
      normal: {
        light: colors.gray800,
        dark: colors.gray800
      },
      active: {
        light: colors.gray200,
        dark: colors.gray200
      }
    },
    background: {
      normal: {
        light: colors.gray200,
        dark: colors.gray500
      },
      active: {
        light: colors.gray800,
        dark: colors.gray900
      }
    }
  }

  const resolveColor = name => allColors[name][state][colorMode]
  const state = isChecked ? 'active' : 'normal'
  const color = resolveColor('color')
  const background = resolveColor('background')
  return (
    <Button
      ref={ref}
      background={background}
      color={color}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      _hover={{
        background: background
      }}
      _active={{
        background: background
      }}
      {...rest}
    />
  )
})

function Exercise ({
  exercise,
  added,
  onSelect
}) {
  const { colorMode } = useColorMode()
  const allColors = {
    buttonAdd: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      },
      hover: {
        light: colors.green800,
        dark: colors.green800
      }
    },
    buttonRemove: {
      normal: {
        light: colors.red500,
        dark: colors.red500
      },
      hover: {
        light: colors.red800,
        dark: colors.red800
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const buttonType = added ? 'buttonRemove' : 'buttonAdd'
  const buttonBackground = resolveColor(buttonType, 'normal')
  const buttonBackgroundHover = resolveColor(buttonType, 'hover')

  const [mediaType, setMediaType] = useState('image')

  const media = mediaType === 'image'
    ? exercise.images.map((item, index) => {
      return (
        <Box key={`image-${index}`} display="block">
          <Image
            width="100%"
            data-src={item.url}
            className="swiper-lazy"
            alt=""
          />
          <Skeleton
            className="preloader-carousel"
            minHeight="100px"
            colorStart={colors.gray200}
            colorEnd={colors.gray800}
          />
        </Box>
      )
    })
    : exercise.videos.map((item, index) => {
      return (
        <Box
          key={`video-${index}`}
          display="block"
          position="relative"
        >
          <ExerciseVideo item={item} />
        </Box>
      )
    })
  const buttonText = added ? 'Remove' : 'Add'

  return (
    <ExerciseCard position="relative">
      <ExerciseHeader
        name={exercise.name}
        level={exercise.level}
        likes={exercise.likes}
        muscleGroups={exercise.muscleGroups}
        requirements={exercise.requirements}
      />
      <Carousel
        key={`${mediaType}-carousel`}
        marginTop="20px"
        marginLeft="-25px"
        marginRight="-25px"
        config={{ autoHeight: true }}
        count={media.length}
      >
        {media}
      </Carousel>
      <Box>
        <RadioButtonGroup
          defaultValue="image"
          onChange={val => setMediaType(val)}
          isInline
        >
          <MediaTypeRadio value="image">
            <Icon name="image" size="24px" />
          </MediaTypeRadio>
          <MediaTypeRadio value="video">
            <Icon name="video" size="24px" />
          </MediaTypeRadio>
        </RadioButtonGroup>
      </Box>
      <Flex
        justifyContent="center"
        marginTop="20px"
      >
        <Button
          size="lg"
          background={buttonBackground}
          color={colors.white}
          _hover={{
            background: buttonBackgroundHover
          }}
          _active={{
            background: buttonBackground
          }}
          onClick={onSelect}
        >{buttonText}</Button>
      </Flex>
      <AbsoluteBox bottom="20px" right="25px">
        <MuscleGroupBody
          muscleGroups={exercise.muscleGroups}
        />
      </AbsoluteBox>
    </ExerciseCard>

  )
}

export default Exercise
