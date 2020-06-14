import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Flex, Text } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { Timer } from '../Timer'
import { Spinner } from '../Spinner'
import { Finish as FinishWorkout } from '../Exercise'
import { showFooter } from '../../store/actions/base'
import { setWorkoutEndTime } from '../../store/actions/exercise'
import { useDocumentVisibility } from '../../hooks'

function Finish ({
  base,
  exercise,
  showFooter,
  setWorkoutEndTime
}) {
  const isHidden = useDocumentVisibility()
  const history = useHistory()
  const {
    selectedExercises,
    cycles,
    workoutStartTime,
    workoutEndTime
  } = exercise
  const mainButton = {
    label: 'Home',
    icon: 'home'
  }
  const rightButton = {
    label: 'Finish',
    icon: 'stop'
  }

  const goHome = () => {
    history.push('/')
  }
  const finishWorkout = () => history.push('/finish')
  const count = selectedExercises.length
  const synced = base.enableSync
  const [ellapsedSeconds, setEllapsedSeconds] = useState(0)

  useEffect(() => {
    showFooter(true)
  }, [showFooter])

  useEffect(() => {
    if (synced && count === 0) {
      history.push('/')
    }
  }, [synced, count, history])

  useEffect(() => {
    if (!isHidden && workoutStartTime) {
      let workoutEndTimeCalc = workoutEndTime
      if (!workoutEndTimeCalc) {
        workoutEndTimeCalc = new Date()
        setWorkoutEndTime(workoutEndTimeCalc)
      }
      const seconds = Math.floor(
        (new Date(workoutEndTimeCalc) - new Date(workoutStartTime)) / 1000
      )
      setEllapsedSeconds(seconds)
    }
  }, [isHidden, workoutStartTime, setWorkoutEndTime, workoutEndTime])

  return (
    <Layout
      mainButton={mainButton}
      rightButton={rightButton}
      onClickMain={goHome}
      onClickRight={finishWorkout}
    >
      {!synced &&
        <Flex
          flexGrow="1"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      }
      {synced && count > 0 &&
        <Flex
          justifyContent="flex-start"
          flexDirection="column"
          flexGrow="1"
        >
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            padding="0 15px"
          >
            <Flex
              alignItems="center"
            >
              <Timer
                initialSeconds={ellapsedSeconds}
                isStarted={false}
                minWidth="160px"
              />
              <Text
                marginLeft="10px"
                as="span"
                fontSize="18px"
              >{cycles}º Cycle</Text>
            </Flex>
          </Flex>
          <FinishWorkout flexGrow="1" />
        </Flex>
      }
    </Layout>
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  showFooter,
  setWorkoutEndTime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Finish)
