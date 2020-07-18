import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Box,
  Text,
  Badge,
  useColorMode
} from '@chakra-ui/core'
import Layout from './Layout'
import { EmptyList } from '../Exercise'
import { ScaleIn, ComposableMoveUp } from '../Animations'
import { colors, utils } from '../../ui'
import { delay } from '../../utils'
import {
  selectWorkoutList,
  setWorkoutStartTime,
  deleteWorkoutList
} from '../../store/actions/exercise'
import { SwipeActions, SwipeActionDelete } from '../SwipeActions'

const { valueByMode } = utils

function ListItem ({
  item,
  onSelect,
  onDelete,
  ...props
}) {
  const { colorMode } = useColorMode()
  const textColorList = valueByMode(
    colors.gray800,
    colors.gray200,
    colorMode
  )
  const background = valueByMode(
    colors.white,
    colors.gray800,
    colorMode
  )
  const [visible, setVisible] = useState(true)
  const handleDelete = async () => {
    setVisible(false)
    await delay(600)
    onDelete(item)
  }
  return (
    <ComposableMoveUp.Item>
      <SwipeActions
        visible={visible}
        context={<SwipeActionDelete onDelete={handleDelete} />}
        height="70px"
      >
        <Box>
          <Flex
            onClick={() => onSelect(item)}
            background={background}
            padding="20px"
            rounded="10px"
            alignItems="center"
            justifyContent="space-between"
            flexGrow="1"
            height="60px"
          >
            <Text
              color={textColorList}
              fontSize="18px"
              margin="0"
            >{item.name}</Text>
            <Badge
              color={colors.green500}
              fontSize="14px"
            >{item.selectedExercises.length} exercise(s)</Badge>
          </Flex>
        </Box>
      </SwipeActions>
    </ComposableMoveUp.Item>
  )
}

function SavedLists ({
  exercise,
  selectWorkoutList,
  setWorkoutStartTime,
  deleteWorkoutList
}) {
  const history = useHistory()
  const { colorMode } = useColorMode()
  const textColorHelp = valueByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )
  const goToHome = () => history.push('/')
  const mainButton = {
    label: 'Back',
    icon: 'ray'
  }
  const selectList = item => {
    selectWorkoutList(item.code)
    history.push('/exercises-list')
  }
  const deleteItem = item => {
    deleteWorkoutList(item.code)
  }

  const list = exercise.savedWorkoutLists.map(item => {
    return (
      <ListItem
        key={item.code}
        item={item}
        onSelect={selectList}
        onDelete={deleteItem}
      />
    )
  })
  const isEmptyList = list.length === 0

  return (
    <Layout
      mainButton={mainButton}
      onClickMain={goToHome}
    >
      {isEmptyList &&
        <Flex
          flexGrow="1"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleIn>
            <EmptyList />
          </ScaleIn>
        </Flex>
      }
      {!isEmptyList &&
        <Box
          margin={["0 10px 10px 10px", "0 auto"]}
          width="100%"
          maxWidth={["100%", "600px"]}
        >
          <Text
            color={textColorHelp}
            textAlign="center"
            margin="20px 0 0 0"
          >Select a list to start:</Text>
          <ComposableMoveUp.Container
            margin="10px 20px 20px 20px"
            paddingBottom="40px"
          >
            {list}
          </ComposableMoveUp.Container>
        </Box>
      }
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  selectWorkoutList,
  setWorkoutStartTime,
  deleteWorkoutList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedLists)
