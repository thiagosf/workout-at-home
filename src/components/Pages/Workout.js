import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Exercise } from '../Exercise'

function Workout ({
  base,
  exercise,
  setConfig
}) {
  const history = useHistory()
  const {
    currentIndexExercise,
    list,
    selectedExercises
  } = exercise
  const currentExercise = selectedExercises.filter((item, index) => {
    return +index === +currentIndexExercise
  }).map(item => {
    const exercise = list.find(i => +i.id === +item.exercise_id)
    return {
      exercise,
      data: item
    }
  }).pop()
  const mainButton = {
    label: 'Next',
    icon: 'arrowRight'
  }
  const rightButton = {
    label: 'Finish',
    icon: 'stop'
  }
  const nextExercise = () => history.push('/workout/next-exercise')
  const finishWorkout = () => history.push('/workout/finish')
  const [isConfigured, setIsConfigured] = useState(false)
  const config = {
    mainButton,
    rightButton,
    onClickMain: nextExercise,
    onClickRight: finishWorkout,
    repetitionCount: currentExercise.data.count,
    repetitionCountType: currentExercise.data.count_type
  }

  useEffect(() => {
    if (!isConfigured) {
      setConfig(config)
      setIsConfigured(true)
    }
  }, [
    setConfig,
    config,
    isConfigured
  ])

  if (!currentExercise.exercise) {
    return false
  }

  return (
    <Exercise
      exercise={currentExercise.exercise}
      flexGrow="1"
      margin="15px 15px 45px 15px "
    />
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })

export default connect(mapStateToProps)(Workout)
