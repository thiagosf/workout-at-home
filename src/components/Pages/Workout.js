import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Flex, Text } from '@chakra-ui/core'
import Layout from './Layout'
import { RepetitionCount } from '../RepetitionCount'
import { Timer } from '../Timer'
import { showFooter } from '../../store/actions/base'
import {
  addCycle
} from '../../store/actions/exercise'

function Workout ({
  exercise,
  addCycle,
  showFooter
}) {
  const { cycles } = exercise
  const mainButton = {
    label: 'Next',
    icon: 'arrowRight'
  }
  const rightButton = {
    label: 'Finish',
    icon: 'stop'
  }
  const nextExercise = () => addCycle()
  const finishWorkout = () => console.log('finishWorkout')

  useEffect(() => {
    showFooter(true)
  }, [showFooter])

  return (
    <Layout
      mainButton={mainButton}
      rightButton={rightButton}
      onClickMain={nextExercise}
      onClickRight={finishWorkout}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="0 15px"
      >
        <RepetitionCount
          count={10}
          countType="reps"
          isStarted={true}
        />
        <Flex
          alignItems="center"
        >
          <Timer
            initialSeconds={10}
            isStarted={true}
            minWidth="160px"
          />
          <Text
            marginLeft="10px"
            as="span"
            fontSize="18px"
          >{cycles}º Cycle</Text>
        </Flex>
      </Flex>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  addCycle,
  showFooter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout)
