import React, { useState, useEffect } from 'react'
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
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel, ExerciseFilters } from '../Exercise'
import { TabBar } from '../TabBar'
import { loadExercises } from '../../store/actions/exercise'
import { exerciseUtils } from '../../utils'
import { colors } from '../../ui'

const Home = function ({
  exercise,
  loadExercises
}) {
  const onSelectMuscleGroup = item => {
    setMuscleGroup(+item.id)
  }

  const onSelectExercise = item => {
    const set = new Set(selecteds)
    const id = +item.id
    if (set.has(id)) {
      set.delete(id)
    } else {
      set.add(id)
    }
    setSelecteds([...set])
  }

  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selecteds, setSelecteds] = useState([])
  const [muscleGroup, setMuscleGroup] = useState(null)
  const [equipaments, setEquipaments] = useState([])
  const [selectedEquipaments, setSelectedEquipaments] = useState([])
  const muscleGroups = exerciseUtils.getMuscleGroups(exercise.list)
    .map(item => {
      return {
        ...item,
        active: +item.id === muscleGroup
      }
    })

  const exercises = exercise.list.filter(item => {
    if (muscleGroup) {
      return item.muscle_groups
        .map(item => +item.id)
        .includes(muscleGroup)
    }
    return true
  })
  const leftButton = {
    label: 'Edit list',
    icon: 'pencil',
    counter: selecteds.length
  }
  const rightButton = {
    label: 'Filters',
    icon: 'filter',
    counter: 0
  }
  const mainButton = {
    label: 'Start!',
    icon: 'ray'
  }
  const goToEditList = () => console.log('goToEditList')
  const onFilter = values => setSelectedEquipaments(values)
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
  const progressTrackColor = resolveColor('progressTrack', 'normal')
  const progressBackgroundColor = resolveColor('progressBackground', 'normal')
  const progressColor = resolveColor('progress', 'normal')

  useEffect(() => {
    loadExercises().then(items => {
      let equipaments = items.map(exercise => {
        return exercise.requirements.map(item => ({
          label: item.name,
          value: item.id.toString()
        }))
      }).flat()
      equipaments = [{
        label: 'All equipaments',
        value: 'all'
      }].concat(equipaments)
      const equipamentValues = equipaments.map(item => item.value)
      equipaments = equipaments.filter((item, index) => {
        return equipamentValues.indexOf(item.value) === index
      })
      setEquipaments(equipaments)
      setSelectedEquipaments(equipaments.map(item => item.value))
    })
  }, [loadExercises])

  useEffect(() => {
    if (!muscleGroup && muscleGroups.length > 0) {
      setMuscleGroup(+muscleGroups[0].id)
    }
  }, [muscleGroup, muscleGroups])

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
            <ExerciseCarousel
              onSelect={onSelectExercise}
              selecteds={selecteds}
              exercises={exercises}
            />
          }
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxHeight="50%">
          <DrawerCloseButton color={drawerColor} />
          <Box overflow="auto">
            <ExerciseFilters
              equipaments={equipaments}
              onChange={onFilter}
              selecteds={selectedEquipaments}
            />
          </Box>
        </DrawerContent>
      </Drawer>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = { loadExercises }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
