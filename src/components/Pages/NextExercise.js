import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Flex, Text } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { Timer } from '../Timer'
import { Spinner } from '../Spinner'
import { WaitBeforeNextExercise } from '../Exercise'
import { showFooter } from '../../store/actions/base'
import { nextExercise } from '../../store/actions/exercise'
import { useDocumentVisibility } from '../../hooks'

function NextExercise ({
  base,
  exercise,
  showFooter,
  nextExercise
}) {
  const isHidden = useDocumentVisibility()
  const history = useHistory()
  const {
    selectedExercises,
    cycles,
    workoutStartTime,
    rest
  } = exercise
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
  const count = selectedExercises.length
  const synced = base.enableSync
  const [startedTimer, setStartedTimer] = useState(false)
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
    if (isHidden) {
      setEllapsedSeconds(0)
      setStartedTimer(false)
    } else if (workoutStartTime !== null) {
      const now = new Date()
      const seconds = Math.floor((now - new Date(workoutStartTime)) / 1000)
      setEllapsedSeconds(seconds)
      setStartedTimer(true)
    }
  }, [isHidden, workoutStartTime])

  return (
    <Layout
      mainButton={mainButton}
      rightButton={rightButton}
      onClickMain={toNext}
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
                isStarted={startedTimer}
                minWidth="160px"
              />
              <Text
                marginLeft="10px"
                as="span"
                fontSize="18px"
              >{cycles}º Cycle</Text>
            </Flex>
          </Flex>
          <WaitBeforeNextExercise
            seconds={rest}
            onFinish={toNext}
            isStarted={startedTimer}
          />
        </Flex>
      }
    </Layout>
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
