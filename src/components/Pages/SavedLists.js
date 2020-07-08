import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swiper from 'react-id-swiper'
import {
  Flex,
  Box,
  Text,
  Badge,
  Button,
  useColorMode
} from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import Layout from './Layout'
import { EmptyList } from '../Exercise'
import { ScaleIn } from '../Animations'
import { colors, utils } from '../../ui'
import {
  selectWorkoutList,
  setWorkoutStartTime,
  deleteWorkoutList
} from '../../store/actions/exercise'

const { valueByMode } = utils

const variants = {
  hidden: {
    opacity: 0,
    height: 0,
    x: '-100%',
    transition: {
      ease: 'easeOut',
      x: {
        duration: 0.3
      },
      height: {
        delay: 0.1,
        duration: 0.5
      }
    }
  },
  visible: {
    opacity: 1
  }
}

const MotionBox = motion.custom(Box)

function ListItem ({
  item,
  onSelect,
  onDelete,
  ...props
}) {
  const controls = useAnimation()
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
  const buttonBackground = valueByMode(
    colors.red500,
    colors.red500,
    colorMode
  )
  const buttonBackgroundActive = valueByMode(
    colors.red300,
    colors.red800,
    colorMode
  )
  const buttonColor = valueByMode(
    colors.white,
    colors.white,
    colorMode
  )
  return (
    <MotionBox
      variants={variants}
      animate={controls}
      initial="visible"
      marginTop="10px"
      {...props}
    >
      <Swiper slidesPerView="auto">
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
        <Box
          width="100px"
        >
          <Flex
            height="60px"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              background={buttonBackground}
              color={buttonColor}
              rounded="5px"
              _hover={{ background: buttonBackground }}
              _active={{ background: buttonBackgroundActive }}
              _focus={{ background: buttonBackgroundActive }}
              onClick={async () => {
                await controls.start('hidden')
                onDelete(item)
              }}
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Swiper>
    </MotionBox>
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
    setWorkoutStartTime(Date.now())
    history.push('/workout')
  }
  const deleteItem = item => {
    deleteWorkoutList(item.code)
  }

  const list = exercise.savedWorkoutLists.map((item, index) => {
    return (
      <ListItem
        key={index}
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
        <React.Fragment>
          <Text
            color={textColorHelp}
            textAlign="center"
            margin="20px 0 0 0"
          >Select a list to start:</Text>
          <Box
            margin="10px 20px 20px 20px"
            paddingBottom="40px"
          >
            {list}
          </Box>
        </React.Fragment>
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
