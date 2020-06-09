import React from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import Layout from './Layout'
import { colors } from '../../ui'
import { showFooter } from '../../store/actions/base'
import { removeExercise } from '../../store/actions/exercise'
import { NumberControl } from '../NumberControl'
import { ExerciseMiniList } from '../Exercise'
import { Spinner } from '../Spinner'

function ExercisesList ({
  exercise,
  removeExercise,
  showFooter
}) {
  const leftButton = {
    label: 'Clear list',
    icon: 'broom'
  }
  const mainButton = {
    label: 'Start!',
    icon: 'ray'
  }
  const { colorMode } = useColorMode()
  const allColors = {
    restBackground: {
      normal: {
        light: colors.white,
        dark: colors.gray800
      }
    },
    text: {
      normal: {
        light: colors.gray500,
        dark: colors.gray500
      }
    }
  }

  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const restBackgroundColor = resolveColor('restBackground', 'normal')
  const textColor = resolveColor('text', 'normal')
  const goToEditList = () => console.log('goToEditList')
  const onChangeRest = () => console.log('onChangeRest')
  const onChangeList = () => console.log('onChangeList')

  const { loading, list } = exercise
  const exercises = list.filter(item => {
    return exercise.selectedExercises.includes(+item.id)
  })

  React.useEffect(() => {
    showFooter(true)
  }, [showFooter])

  return (
    <Layout
      leftButton={leftButton}
      mainButton={mainButton}
      onClickLeft={goToEditList}
      onClickMainButton={goToEditList}
    >
      <Box
        margin="0 10px 10px 10px"
      >
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
            initialValue={30}
            onChange={onChangeRest}
          />
        </Flex>
        {loading &&
          <Spinner />
        }
        {!loading && exercises.length > 0 &&
          <React.Fragment>
            <Text
              color={textColor}
              textAlign="center"
              margin="10px 0 0 0"
            >Drag and drop to sort list</Text>
            <ExerciseMiniList
              margin="10px 0 0 0"
              exercises={exercises}
              onChange={onChangeList}
            />
          </React.Fragment>
        }
      </Box>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  removeExercise,
  showFooter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesList)
