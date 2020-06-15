import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Flex, Text } from '@chakra-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Layout from './Layout'
import { RepetitionCount } from '../RepetitionCount'
import { Timer } from '../Timer'
import { Spinner } from '../Spinner'
import { useDocumentVisibility } from '../../hooks'
import Workout from './Workout'
import NextExercise from './NextExercise'
import Finish from './Finish'

function WorkoutLayout ({
  base,
  exercise
}) {
  const isHidden = useDocumentVisibility()
  const history = useHistory()
  const { path } = useRouteMatch()
  const {
    selectedExercises,
    cycles,
    workoutStartTime
  } = exercise
  const count = selectedExercises.length
  const synced = base.enableSync
  const [startedTimer, setStartedTimer] = useState(false)
  const [ellapsedSeconds, setEllapsedSeconds] = useState(0)
  const [config, setConfig] = useState({
    mainButton: null,
    rightButton: null,
    leftButton: null,
    repetitionCount: null,
    repetitionCountType: null,
    isFinish: false
  })

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
      setStartedTimer(config.isFinish ? false : true)
    }
  }, [isHidden, workoutStartTime, config])

  return (
    <Layout
      mainButton={config.mainButton}
      rightButton={config.rightButton}
      leftButton={config.leftButton}
      onClickMain={config.onClickMain}
      onClickRight={config.onClickRight}
      onClickLeft={config.onClickLeft}
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
            {!config.repetitionCountType &&
              <Flex />
            }
            {config.repetitionCountType &&
              <RepetitionCount
                count={config.repetitionCount}
                countType={config.repetitionCountType}
                isStarted={true}
              />
            }
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
          <Switch>
            <Route exact path={path}>
              <Workout setConfig={setConfig} />
            </Route>
            <Route path={`${path}/next-exercise`}>
              <NextExercise setConfig={setConfig} />
            </Route>
            <Route path={`${path}/finish`}>
              <Finish />
            </Route>
          </Switch>
        </Flex>
      }
    </Layout>
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })

export default connect(mapStateToProps)(WorkoutLayout)
