import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  CircularProgress,
  useDisclosure,
  useColorMode
} from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel, ExerciseFilters } from '../Exercise'
import { TabBar } from '../TabBar'
import {
  loadExercises,
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
} from '../../store/actions/exercise'
import { exerciseUtils } from '../../utils'
import { colors } from '../../ui'

const carouselContainer = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      ease: 'easeOut'
    }
  }
}

const MotionBox = motion.custom(Box)

const Home = function ({
  exercise,
  loadExercises,
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
}) {
  const onSelectMuscleGroup = async item => {
    await carouselControls.start('hidden')
    filterMuscleGroup(+item.id)
    carouselControls.start('visible')
  }

  const onSelectExercise = item => {
    const set = new Set(selectedExercises)
    const id = +item.id
    if (set.has(id)) {
      removeExercise(id)
    } else {
      addExercise(id)
    }
  }

  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const carouselControls = useAnimation()

  const {
    list,
    selectedMuscleGroup,
    selectedEquipaments,
    selectedExercises
  } = exercise

  const muscleGroups = exerciseUtils.getMuscleGroups(list)
    .map(item => {
      return {
        ...item,
        active: +item.id === selectedMuscleGroup
      }
    })

  const exercisesByMuscleGroups = exerciseUtils.filterExercises({
    list,
    selectedMuscleGroup
  })

  const exercises = exerciseUtils.filterExercises({
    list: exercisesByMuscleGroups,
    selectedEquipaments
  })

  const equipaments = exerciseUtils.getEquipaments(exercisesByMuscleGroups)

  const leftButton = {
    label: 'Edit list',
    icon: 'pencil',
    counter: selectedExercises.length
  }
  const rightButton = {
    label: 'Filters',
    icon: 'filter',
    counter: selectedEquipaments
      .filter(value => value !== 'all')
      .length
  }
  const mainButton = {
    label: 'Start!',
    icon: 'ray'
  }
  const goToEditList = () => console.log('goToEditList')
  const onFilterEquipament = async values => {
    await carouselControls.start('hidden')
    filterEquipaments(values)
    carouselControls.start('visible')
  }
  const openFilters = () => onOpen()
  const footer = (
    <TabBar
      leftButton={leftButton}
      rightButton={rightButton}
      mainButton={mainButton}
      onClickLeft={goToEditList}
      onClickRight={openFilters}
      onClickMainButton={goToEditList}
    />
  )

  const allColors = {
    drawer: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    drawerOverlay: {
      normal: {
        light: colors.whiteOpacity700,
        dark: colors.blackOpacity700
      }
    },
    progressTrack: {
      normal: {
        light: 'gray',
        dark: 'gray'
      }
    },
    progress: {
      normal: {
        light: 'green',
        dark: 'green'
      }
    },
    progressBackground: {
      normal: {
        light: colors.white,
        dark: colors.gray800
      }
    }
  }
  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const drawerColor = resolveColor('drawer', 'normal')
  const drawerOverlayColor = resolveColor('drawerOverlay', 'normal')
  const progressTrackColor = resolveColor('progressTrack', 'normal')
  const progressBackgroundColor = resolveColor('progressBackground', 'normal')
  const progressColor = resolveColor('progress', 'normal')

  useEffect(() => {
    loadExercises().then(items => {
      carouselControls.start('visible')
    })
  }, [loadExercises, carouselControls])

  useEffect(() => {
    if (!selectedMuscleGroup && muscleGroups.length > 0) {
      filterMuscleGroup(+muscleGroups[0].id)
    }
  }, [selectedMuscleGroup, muscleGroups, filterMuscleGroup])

  return (
    <Layout
      footer={footer}
    >
      <Flex
        flexGrow="1"
        height="200px"
        flexDirection="column"
        justifyContent="space-between"
      >
        <MuscleGroup
          onSelect={onSelectMuscleGroup}
          muscleGroups={muscleGroups}
          margin="0 0 10px 0"
        />
        <Flex
          flexGrow="1"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
        >
          {exercise.loading &&
            <Flex
              alignSelf="center"
              background={progressBackgroundColor}
              padding="10px"
              rounded="full"
            >
              <CircularProgress
                margin="0"
                isIndeterminate
                size="36px"
                trackColor={progressTrackColor}
                color={progressColor}
              />
            </Flex>
          }
          {exercises.length > 0 &&
            <MotionBox
              variants={carouselContainer}
              initial="hidden"
              flexGrow="1"
              animate={carouselControls}
            >
              <ExerciseCarousel
                height="100%"
                onSelect={onSelectExercise}
                selecteds={selectedExercises}
                exercises={exercises}
              />
            </MotionBox>
          }
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay
          background={drawerOverlayColor}
        />
        <DrawerContent maxHeight="50%">
          <DrawerCloseButton color={drawerColor} />
          <Box overflow="auto">
            <ExerciseFilters
              equipaments={equipaments}
              onChange={onFilterEquipament}
              selecteds={selectedEquipaments}
            />
          </Box>
        </DrawerContent>
      </Drawer>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  loadExercises,
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
