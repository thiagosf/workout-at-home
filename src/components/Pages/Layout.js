import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Flex, Box, useColorMode } from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { Header } from '../Header'
import { TabBar } from '../TabBar'
import { colors, utils } from '../../ui'
import { loadExercises } from '../../store/actions/exercise'
import {
  syncLocalStorage,
  showFooter,
  setOnboarding
} from '../../store/actions/base'

const tabBarContainer = {
  hidden: { y: '150%' },
  visible: {
    y: '0%',
    transition: {
      delay: 0.3,
      ease: 'easeOut'
    }
  }
}

const MotionBox = motion.custom(Box)

function Layout({
  base,
  children,
  leftButton,
  rightButton,
  mainButton,
  onClickLeft,
  onClickRight,
  onClickMain,
  loadExercises,
  exercise,
  syncLocalStorage,
  showFooter,
  setOnboarding,
  ...props
}) {
  const history = useHistory()
  const { valueByMode } = utils
  const { colorMode, toggleColorMode } = useColorMode()
  const color = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const backgroundColor = valueByMode(
    colors.gray200,
    colors.gray900,
    colorMode
  )

  const footerControls = useAnimation()
  const { footer: footerVisible, enabledSync, onboarding } = base
  const { list } = exercise

  const footer = (
    <MotionBox
      variants={tabBarContainer}
      initial={footerVisible ? 'visible' : 'hidden'}
      animate={footerControls}
    >
      <TabBar
        leftButton={leftButton}
        rightButton={rightButton}
        mainButton={mainButton}
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        onClickMain={onClickMain}
      />
    </MotionBox>
  )

  useEffect(() => {
    if (footerVisible) {
      footerControls.start('visible')
    }
  }, [footerControls, footerVisible])

  useEffect(() => {
    if (list.length === 0) {
      loadExercises()
    }
  }, [loadExercises, list])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    syncLocalStorage()
  }, [syncLocalStorage])

  useEffect(() => {
    if (enabledSync && !footerVisible) {
      showFooter(true)
    }
  }, [showFooter, enabledSync, footerVisible])

  useEffect(() => {
    if (!onboarding && enabledSync) {
      setOnboarding(true)
      history.push('/onboarding')
    }
  }, [history, setOnboarding, onboarding, enabledSync])

  return (
    <Flex
      color={color}
      background={backgroundColor}
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >
      <Box padding="10px">
        <Header
          colorMode={colorMode}
          onColorModeSwitch={toggleColorMode}
        />
      </Box>
      <Flex
        flexGrow="1"
        overflow="auto"
        flexDirection="column"
        marginBottom="65px"
      >
        {children}
      </Flex>
      <Box
        position="fixed"
        zIndex="10"
        bottom="0"
        left="0"
        right="0"
      >
        {footer}
      </Box>
    </Flex>
  )
}

const mapStateToProps = ({ base, exercise }) => ({ base, exercise })
const mapDispatchToProps = {
  loadExercises,
  syncLocalStorage,
  showFooter,
  setOnboarding
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Layout
)
