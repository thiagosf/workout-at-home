import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Box,
  Text,
  Switch,
  FormLabel,
  Input,
  useColorMode
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { colors, utils } from '../../ui'
import {
  addExercise,
  updateExercise,
  removeExercise,
  removeAllExercises,
  setRest,
  setWorkoutStartTime,
  saveWorkoutList
} from '../../store/actions/exercise'
import { NumberControl } from '../NumberControl'
import { ExerciseMiniList, EmptyList } from '../Exercise'
import { Spinner } from '../Spinner'
import { Confirm } from '../Confirm'
import { ScaleIn } from '../Animations'

function ExercisesList ({
  exercise,
  updateExercise,
  removeExercise,
  removeAllExercises,
  addExercise,
  setRest,
  setWorkoutStartTime,
  saveWorkoutList
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
    if (
      (saveList && listName) ||
      !saveList
    ) {
      if (!isEmptyList) {
        saveWorkoutList(listName)
        setWorkoutStartTime(Date.now())
      }
      history.push(
        isEmptyList
          ? '/'
          : '/workout'
      )
    } else {
    }
  }
  const onChangeRest = data => setRest(data)
  const onChangeList = data => {
    data.forEach(item => {
      updateExercise({
        ...item.data,
        sort: item.sort
      })
    })
  }
  const onDelete = item => {
    removeExercise(item.data.code)
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
  const [saveList, setSaveList] = useState(false)
  const [listName, setListName] = useState('')
  const handleChange = fn => event => fn(event.target.value)

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
          <Box>
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
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
              height="35px"
            >
              <FormLabel
                display="flex"
                alignItems="center"
                flexShrink="0"
                padding="0"
                marginRight="20px"
              >
                <Switch
                  display="flex"
                  onChange={() => setSaveList(saveList ? false : true)}
                />
                <Text
                  display="inline-block"
                  margin="0 0 0 10px"
                  as="span"
                >Save list</Text>
              </FormLabel>
              {saveList &&
                <Input
                  flexGrow="1"
                  placeholder="Give a name"
                  size="sm"
                  onChange={handleChange(setListName)}
                />
              }
            </Flex>
          </Box>
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
              onDelete={onDelete}
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
  updateExercise,
  removeExercise,
  removeAllExercises,
  setRest,
  setWorkoutStartTime,
  saveWorkoutList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesList)
