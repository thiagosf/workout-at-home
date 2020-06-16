import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { WaitBeforeNextExercise } from '../Exercise'
import { nextExercise } from '../../store/actions/exercise'

function NextExercise ({
  base,
  exercise,
  nextExercise,
  setConfig
}) {
  const history = useHistory()
  const { rest } = exercise
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
    <WaitBeforeNextExercise
      seconds={rest}
      onFinish={toNext}
      isStarted={true}
      display="flex"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
    />
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
