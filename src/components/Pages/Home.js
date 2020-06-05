import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Flex } from '@chakra-ui/core'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel } from '../Exercise'
import { TabBar } from '../TabBar'
import { loadExercises } from '../../store/actions/exercise'
import { exerciseUtils } from '../../utils'

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

  const [selecteds, setSelecteds] = useState([])
  const [muscleGroup, setMuscleGroup] = useState(null)
  const muscleGroups = exerciseUtils.getMuscleGroups(exercise.list)
    .map(item => {
      return {
        ...item,
        active: +item.id === muscleGroup
      }
    })
  const exercises = exercise.list
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
  const openFilters = () => console.log('openFilters')
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

  useEffect(() => {
    loadExercises()
  }, [loadExercises])

  useEffect(() => {
    if (!muscleGroup && muscleGroups.length > 0) {
      setMuscleGroup(+muscleGroups[0].id)
    }
  }, [muscleGroup, muscleGroups, setMuscleGroup])

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
          {exercises.length > 0 &&
            <ExerciseCarousel
              onSelect={onSelectExercise}
              selecteds={selecteds}
              exercises={exercises}
            />
          }
        </Flex>
      </Flex>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = { loadExercises }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
