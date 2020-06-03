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
    <Flex
      flexDirection="column"
      flexGrow="1"
    >
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
        opts={{
          height: '100%',
          width: '100%'
        }}
        url={item.url}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnd={() => setPlaying(false)}
      />
    </Flex>
  )
}

const ExerciseMediaCarousel = ({
  name,
  insideCarousel,
  display,
  items,
  ...props
}) => {
  return (
    <Carousel
      key={name}
      nested={insideCarousel}
      display={display}
      marginTop="20px"
      marginLeft="-25px"
      marginRight="-25px"
      count={items.length}
      {...props}
    >
      {items}
    </Carousel>
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
  onSelect,
  insideCarousel = false,
  ...props
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

  const images = exercise.images.map((item, index) => {
    return (
      <Flex
        key={`image-${index}`}
        flexDirection="column"
        flexGrow="1"
      >
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
      </Flex>
    )
  })
  const videos = exercise.videos.map((item, index) => {
    return (
      <Flex
        key={`video-${index}`}
        position="relative"
        flexDirection="column"
        flexGrow="1"
      >
        <ExerciseVideo item={item} />
      </Flex>
    )
  })
  const buttonText = added ? 'Remove' : 'Add'

  return (
    <ExerciseCard position="relative" {...props}>
      <Flex
        flexDirection="column"
        flexGrow="1"
      >
        <Flex
          flexDirection="column"
          flexGrow="1"
        >
          <ExerciseHeader
            name={exercise.name}
            level={exercise.level}
            likes={exercise.likes}
            muscleGroups={exercise.muscle_groups}
            requirements={exercise.requirements}
          />
          <ExerciseMediaCarousel
            name='images'
            nested={insideCarousel}
            items={images}
            display={mediaType === 'image' ? 'flex' : 'none'}
            flexGrow="1"
          />
          <ExerciseMediaCarousel
            name='videos'
            nested={insideCarousel}
            items={videos}
            display={mediaType === 'video' ? 'flex' : 'none'}
            flexGrow="1"
          />
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
        </Flex>
      </Flex>
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
          muscleGroups={exercise.muscle_groups}
        />
      </AbsoluteBox>
    </ExerciseCard>

  )
}

export default Exercise
