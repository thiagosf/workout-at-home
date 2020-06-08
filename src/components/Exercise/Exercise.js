import React, { useState } from 'react'
import {
  Flex,
  Box,
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
  const [videoRef, setVideoRef] = useState(null)

  return (
    <Flex
      flexDirection="column"
      flexGrow="1"
      position="relative"
      height="100%"
    >
      <AbsoluteBox
        zIndex="2"
        top="0"
        left="0"
        right="0"
        bottom="0"
        pointerEvents={playing ? 'none' : 'initial'}
        width="100%"
        onClick={() => {
          console.log('here...', videoRef)
          videoRef.playVideo()
        }}
      />
      <VideoPlayer
        opts={{
          height: '100%',
          width: '100%',
          controls: 0,
          autoplay: 0,
          rel: 0,
          modestbranding: 1
        }}
        url={item.url}
        className="youtube-absolute"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnd={() => setPlaying(false)}
        onReady={(event) => {
          if (!videoRef) {
            setVideoRef(event.target)
          }
        }}
      />
    </Flex>
  )
}

const ExerciseMediaCarousel = ({
  name,
  insideCarousel,
  display,
  rounded,
  items,
  ...props
}) => {
  return (
    <Carousel
      key={name}
      nested={insideCarousel}
      display={display}
      minHeight="100px"
      marginTop="20px"
      marginLeft="-15px"
      marginRight="-15px"
      count={items.length}
      containerClass="swiper-container swiper-container-full"
      {...props}
    >
      {items}
    </Carousel>
  )
}

const MediaTypeRadio = React.forwardRef((props, ref) => {
  const { colorMode } = useColorMode()
  const { isChecked, isDisabled, rounded, value, ...rest } = props
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
      padding="0"
      rounded={rounded}
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
    const filter = item.line_art && colorMode === 'dark'
      ? 'invert(0.8)'
      : null
    return (
      <Box
        key={`image-${index}`}
        data-background={item.url}
        className="swiper-lazy"
        flexGrow="1"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        width="100px"
        height="100px"
        style={{ filter }}
      />
    )
  })
  const videos = exercise.videos.map((item, index) => {
    return (
      <Flex
        key={`video-${index}`}
        position="relative"
        flexDirection="column"
        flexGrow="1"
        data-background={item.thumb_url}
        className="swiper-lazy"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        width="100px"
        height="100px"
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
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginTop="10px"
      >
        <Box width="30%">
          <RadioButtonGroup
            defaultValue="image"
            onChange={val => setMediaType(val)}
            spacing="0"
            isInline
          >
            <MediaTypeRadio value="image" rounded="3px 0 0 3px">
              <Icon name="image" size="24px" />
            </MediaTypeRadio>
            <MediaTypeRadio value="video" rounded="0 3px 3px 0">
              <Icon name="video" size="24px" />
            </MediaTypeRadio>
          </RadioButtonGroup>
        </Box>
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
        <Flex width="30%" justifyContent="flex-end">
          <MuscleGroupBody
            width="70%"
            muscleGroups={exercise.muscle_groups}
          />
        </Flex>
      </Flex>
    </ExerciseCard>
  )
}

export default Exercise
