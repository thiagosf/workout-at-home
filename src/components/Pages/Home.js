import React, { useState, useEffect } from 'react'
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
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel, ExerciseFilters } from '../Exercise'
import { Opacity, ScaleIn } from '../Animations'
import { Spinner } from '../Spinner'
import {
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
} from '../../store/actions/exercise'
import { exerciseUtils, delay } from '../../utils'
import { colors, utils } from '../../ui'

const Home = function ({
  base,
  exercise,
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
}) {
  const onSelectMuscleGroup = async item => {
    setVisibleCarousel(false)
    await delay(300)
    filterMuscleGroup(+item.id)
    filterEquipaments([])
    setVisibleCarousel(true)
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
  const history = useHistory()
  const [visibleCarousel, setVisibleCarousel] = useState(false)
  const [visibleMuscleGroup, setVisibleMuscleGroup] = useState(false)

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
    setVisibleCarousel(false)
    setVisibleMuscleGroup(false)
    await delay(300)
    history.push('/exercises-list')
  }
  const onFilterEquipament = async values => {
    setVisibleCarousel(false)
    await delay(300)
    filterEquipaments(values)
    setVisibleCarousel(true)
  }
  const openFilters = () => onOpen()

  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const drawerColor = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const drawerOverlayColor = valueByMode(
    colors.blackOpacity700,
    colors.blackOpacity700,
    colorMode
  )

  useEffect(() => {
    if (!loading && list.length > 0) {
      setVisibleCarousel(true)
      setVisibleMuscleGroup(true)
    }
  }, [
    list,
    loading
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
        <Opacity
          visible={visibleMuscleGroup}
        >
          <MuscleGroup
            onSelect={onSelectMuscleGroup}
            muscleGroups={muscleGroups}
            margin="0 0 10px 0"
          />
        </Opacity>
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
            <ScaleIn
              flexGrow="1"
              visible={visibleCarousel}
            >
              <ExerciseCarousel
                height="100%"
                onSelect={onSelectExercise}
                selecteds={selectedExercisesIDs}
                exercises={exercises}
              />
            </ScaleIn>
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

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  filterMuscleGroup,
  filterEquipaments,
  addExercise,
  removeExercise
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
