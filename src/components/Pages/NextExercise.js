import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/core'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { WaitBeforeNextExercise, ExerciseMiniNext } from '../Exercise'
import { ScaleIn } from '../Animations'
import { nextExercise } from '../../store/actions/exercise'

function NextExercise ({
  base,
  exercise,
  nextExercise,
  setConfig
}) {
  const history = useHistory()
  const { rest, currentIndexExercise, selectedExercises } = exercise
  const mainButton = {
    label: 'Jump!',
    icon: 'arrowRight'
  }
  const rightButton = {
    label: 'Finish',
    icon: 'stop'
  }

  const toNext = () => {
    nextExercise()
    history.push('/workout')
  }
  const finishWorkout = () => history.push('/workout/finish')
  const [isConfigured, setIsConfigured] = useState(false)
  const config = {
    mainButton,
    rightButton,
    onClickMain: toNext,
    onClickRight: finishWorkout
  }

  let nextIndexExercise = currentIndexExercise + 1
  if ((nextIndexExercise + 1) > selectedExercises.length) {
    nextIndexExercise = 0
  }
  const nextExerciseItem = selectedExercises.find((item, index) => {
    return +index === nextIndexExercise
  })
  const nextExerciseData = exercise.list.find(exercise => {
    return +exercise.id === +nextExerciseItem.exercise_id
  })

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

  return (
    <Flex
      flexDirection="column"
      flexGrow="1"
    >
      <ScaleIn
        display="flex"
        flexGrow="1"
      >
        <WaitBeforeNextExercise
          seconds={rest}
          onFinish={toNext}
          isStarted={true}
          display="flex"
          flexGrow="1"
          flexDirection="column"
          justifyContent="center"
        />
      </ScaleIn>
      <ScaleIn
        padding="20px"
        marginBottom="25px"
      >
        <ExerciseMiniNext
          exercise={nextExerciseData}
        />
      </ScaleIn>
    </Flex>
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  nextExercise
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextExercise)
