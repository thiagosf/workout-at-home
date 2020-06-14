import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Flex, Text } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { RepetitionCount } from '../RepetitionCount'
import { Timer } from '../Timer'
import { Spinner } from '../Spinner'
import { Exercise } from '../Exercise'
import { showFooter } from '../../store/actions/base'
import { useDocumentVisibility } from '../../hooks'

function Workout ({
  base,
  exercise,
  showFooter
}) {
  const isHidden = useDocumentVisibility()
  const history = useHistory()
  const {
    currentIndexExercise,
    list,
    selectedExercises,
    cycles,
    workoutStartTime
  } = exercise
  const currentExercise = selectedExercises.filter(item => {
    return +item.sort === currentIndexExercise
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
  const nextExercise = () => history.push('/next-exercise')
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
      onClickMain={nextExercise}
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
            justifyContent="space-between"
            alignItems="center"
            padding="0 15px"
          >
            <RepetitionCount
              count={currentExercise.data.count}
              countType={currentExercise.data.count_type}
              isStarted={true}
            />
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
          {currentExercise.exercise &&
            <Exercise
              exercise={currentExercise.exercise}
              flexGrow="1"
              margin="15px 15px 45px 15px "
            />
          }
        </Flex>
      }
    </Layout>
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  showFooter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout)