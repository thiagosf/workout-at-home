import React from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { colors, utils } from '../../ui'
import {
  addExercise,
  removeExercise,
  removeAllExercises,
  setRest,
  setWorkoutStartTime
} from '../../store/actions/exercise'
import { NumberControl } from '../NumberControl'
import { ExerciseMiniList, EmptyList } from '../Exercise'
import { Spinner } from '../Spinner'
import { Confirm } from '../Confirm'
import { ScaleIn } from '../Animations'

function ExercisesList ({
  exercise,
  removeExercise,
  removeAllExercises,
  addExercise,
  setRest,
  setWorkoutStartTime
}) {
  const history = useHistory()
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const restBackgroundColor = valueByMode(
    colors.white,
    colors.gray800,
    colorMode
  )
  const textColor = valueByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )
  const clearList = () => setIsOpenClear(true)
  const backToHome = () => history.push('/')
  const startWorkout = () => {
    if (!isEmptyList) {
      setWorkoutStartTime(Date.now())
    }
    history.push(
      isEmptyList
        ? '/'
        : '/workout'
    )
  }
  const onChangeRest = data => setRest(data)
  const onChangeList = data => {
    addExercise(data.map(item => item.data))
  }

  const { loading, list, selectedExercises, rest } = exercise
  const exercises = selectedExercises.map(item => {
    const exercise = list.find(i => +i.id === +item.exercise_id)
    return {
      exercise,
      data: item
    }
  })
  const [isOpenClear, setIsOpenClear] = React.useState()
  const onCloseClear = () => setIsOpenClear(false)
  const cancelRefClear = React.useRef()
  const onConfirmClear = () => {
    removeAllExercises()
    setIsOpenClear(false)
  }
  const isEmptyList = exercises.length === 0

  const leftButton = {
    label: 'Clear list',
    icon: 'broom'
  }
  const rightButton = {
    label: 'Add more',
    icon: 'plus'
  }
  const mainButton = {
    label: isEmptyList ? 'Add' : 'Start!',
    icon: isEmptyList ? 'plus' : 'ray'
  }

  return (
    <Layout
      leftButton={isEmptyList ? null : leftButton}
      rightButton={isEmptyList ? null : rightButton}
      mainButton={mainButton}
      onClickLeft={clearList}
      onClickRight={backToHome}
      onClickMain={startWorkout}
    >
      <Confirm
        isOpen={isOpenClear}
        cancelRef={cancelRefClear}
        onClose={onCloseClear}
        onConfirm={onConfirmClear}
        title="Clear list"
        text="Are you sure?"
        buttonNo="No"
        buttonYes="Yes"
      />
      <Flex
        flexGrow="1"
        flexDirection="column"
        justifyContent={isEmptyList ? 'center' : 'flex-start'}
        margin="0 10px 10px 10px"
      >
        {!loading && isEmptyList &&
          <ScaleIn>
            <EmptyList />
          </ScaleIn>
        }
        {!loading && !isEmptyList &&
          <Flex
            alignItems="center"
            padding="10px"
            background={restBackgroundColor}
            rounded="5px"
          >
            <Text
              flexGrow="1"
              marginRight="10px"
            >Rest in <Text as="strong">seconds</Text> between exercises:</Text>
            <NumberControl
              initialValue={rest}
              onChange={onChangeRest}
            />
          </Flex>
        }
        {loading &&
          <Flex
            flexGrow="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Spinner />
          </Flex>
        }
        {!loading && !isEmptyList &&
          <React.Fragment>
            <Text
              color={textColor}
              textAlign="center"
              margin="20px 0 0 0"
            >Drag and drop to sort list:</Text>
            <ExerciseMiniList
              margin="10px 0 0 0"
              exercises={exercises}
              onChange={onChangeList}
            />
          </React.Fragment>
        }
      </Flex>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  addExercise,
  removeExercise,
  removeAllExercises,
  setRest,
  setWorkoutStartTime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesList)
