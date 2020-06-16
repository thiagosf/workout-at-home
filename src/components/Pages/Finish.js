import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Finish as FinishWorkout } from '../Exercise'
import { setWorkoutEndTime } from '../../store/actions/exercise'

function Finish ({
  base,
  exercise,
  setWorkoutEndTime,
  setConfig
}) {
  const history = useHistory()
  const { enabledSync } = base
  const { workoutEndTime } = exercise
  const mainButton = {
    label: 'Home',
    icon: 'home'
  }

  const goHome = () => {
    history.push('/')
  }

  const [isConfigured, setIsConfigured] = useState(false)
  const config = {
    mainButton,
    onClickMain: goHome,
    isFinish: true
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

  useEffect(() => {
    if (enabledSync && !workoutEndTime) {
      setWorkoutEndTime(Date.now())
    }
  }, [enabledSync, setWorkoutEndTime, workoutEndTime])

  return (
    <FinishWorkout flexGrow="1" />
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  setWorkoutEndTime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Finish)
