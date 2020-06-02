import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import { MuscleGroup } from '../MuscleGroup'
import { ExerciseCarousel } from '../Exercise'
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

  useEffect(() => {
    loadExercises()
  }, [loadExercises])

  useEffect(() => {
    if (!muscleGroup && muscleGroups.length > 0) {
      setMuscleGroup(+muscleGroups[0].id)
    }
  }, [muscleGroup, muscleGroups, setMuscleGroup])

  return (
    <Layout>
      <MuscleGroup
        onSelect={onSelectMuscleGroup}
        muscleGroups={muscleGroups}
        marginBottom="10px"
      />
      {exercises.length > 0 &&
        <ExerciseCarousel
          onSelect={onSelectExercise}
          selecteds={selecteds}
          exercises={exercises}
        />
      }
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = { loadExercises }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
