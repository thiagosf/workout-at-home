import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorMode
} from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel, ExerciseFilters } from '../Exercise'
import { Spinner } from '../Spinner'
import { showFooter } from '../../store/actions/base'
import {
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
      delay: 0.3,
      ease: 'easeOut'
    }
  }
}

const muscleGroupContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      ease: 'easeOut'
    }
  }
}

const MotionBox = motion.custom(Box)

const Home = function ({
  exercise,
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise,
  showFooter
}) {
  const onSelectMuscleGroup = async item => {
    await carouselControls.start('hidden')
    filterMuscleGroup(+item.id)
    filterEquipaments([])
    carouselControls.start('visible')
  }

  const onSelectExercise = item => {
    const set = new Set(selectedExercisesIDs)
    const id = +item.id
    if (set.has(id)) {
      removeExercise(id)
    } else {
      addExercise({
        exercise_id: id,
        count: 15,
        count_type: 'reps'
      })
    }
  }

  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const carouselControls = useAnimation()
  const muscleGroupControls = useAnimation()
  const history = useHistory()

  const {
    list,
    loading,
    selectedMuscleGroup,
    selectedEquipaments,
    selectedExercises
  } = exercise
  const selectedExercisesIDs = selectedExercises.map(item => {
    return +item.exercise_id
  })

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

  const rightButton = {
    label: 'Filters',
    icon: 'filter',
    counter: selectedEquipaments
      .filter(value => value !== 'all')
      .length
  }
  const mainButton = {
    label: 'Next',
    count: selectedExercisesIDs.length
  }
  const goToEditList = async () => {
    await Promise.all([
      carouselControls.start('hidden'),
      showFooter(false),
      muscleGroupControls.start('hidden')
    ])
    history.push('/exercises-list')
  }
  const onFilterEquipament = async values => {
    await carouselControls.start('hidden')
    filterEquipaments(values)
    carouselControls.start('visible')
  }
  const openFilters = () => onOpen()

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
    }
  }
  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const drawerColor = resolveColor('drawer', 'normal')
  const drawerOverlayColor = resolveColor('drawerOverlay', 'normal')

  useEffect(() => {
    if (!loading && list.length > 0) {
      carouselControls.start('visible')
      muscleGroupControls.start('visible')
      showFooter(true)
    }
  }, [
    list,
    loading,
    carouselControls,
    muscleGroupControls,
    showFooter
  ])

  useEffect(() => {
    if (!selectedMuscleGroup && muscleGroups.length > 0) {
      filterMuscleGroup(+muscleGroups[0].id)
    }
  }, [selectedMuscleGroup, muscleGroups, filterMuscleGroup])

  return (
    <Layout
      rightButton={rightButton}
      mainButton={mainButton}
      onClickRight={openFilters}
      onClickMain={goToEditList}
    >
      <Flex
        flexGrow="1"
        flexDirection="column"
        justifyContent="space-between"
        paddingBottom="10px"
      >
        <MotionBox
          variants={muscleGroupContainer}
          initial="hidden"
          animate={muscleGroupControls}
        >
          <MuscleGroup
            onSelect={onSelectMuscleGroup}
            muscleGroups={muscleGroups}
            margin="0 0 10px 0"
          />
        </MotionBox>
        <Flex
          flexGrow="1"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
        >
          {loading &&
            <Spinner />
          }
          {!loading && exercises.length > 0 &&
            <MotionBox
              variants={carouselContainer}
              initial="hidden"
              flexGrow="1"
              animate={carouselControls}
            >
              <ExerciseCarousel
                height="100%"
                onSelect={onSelectExercise}
                selecteds={selectedExercisesIDs}
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
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise,
  showFooter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
