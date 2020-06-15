import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { WaitBeforeNextExercise } from '../Exercise'
import { showFooter } from '../../store/actions/base'
import { nextExercise } from '../../store/actions/exercise'

function NextExercise ({
  base,
  exercise,
  showFooter,
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
  const finishWorkout = () => history.push('/finish')
  const [isConfigured, setIsConfigured] = useState(false)
  const config = {
    mainButton,
    rightButton,
    onClickMain: toNext,
    onClickRight: finishWorkout
  }

  useEffect(() => {
    showFooter(true)
  }, [showFooter])

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
  showFooter,
  nextExercise
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextExercise)
