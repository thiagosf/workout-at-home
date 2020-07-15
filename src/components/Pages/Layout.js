import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Flex, Box, useColorMode } from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { Header } from '../Header'
import { TabBar } from '../TabBar'
import { AddToHomeScreen } from '../AddToHomeScreen'
import { ScaleIn } from '../Animations'
import { colors, utils } from '../../ui'
import { loadExercises } from '../../store/actions/exercise'
import {
  syncLocalStorage,
  showFooter,
  setOnboarding,
  setAddToHomeScreen
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
  setAddToHomeScreen,
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
  const {
    footer: footerVisible,
    enabledSync,
    onboarding,
    addToHomeScreen
  } = base
  const { list } = exercise
  const [showAddToHomeScreen, setShowAddToHomeScreen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const onCloseAddToHomeScreen = () => {
    setAddToHomeScreen(true)
  }
  const isHome = history.location.pathname === '/'

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

  const onResize = () => {
    setWindowHeight(window.innerHeight)
  }

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

  useEffect(() => {
    if (!addToHomeScreen && isHome) {
      setTimeout(() => {
        setShowAddToHomeScreen(true)
      }, 1000)
    }
  }, [setShowAddToHomeScreen, addToHomeScreen, isHome])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Flex
      color={color}
      background={backgroundColor}
      height={windowHeight}
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      {...props}
    >
      {!addToHomeScreen && isHome &&
        <ScaleIn
          visible={showAddToHomeScreen}
          position="absolute"
          zIndex="1000"
          bottom="0"
          left="0"
          right="0"
          padding="20px"
          backgroundImage="linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"
        >
          <AddToHomeScreen
            onCloseAddToHomeScreen={onCloseAddToHomeScreen}
          />
        </ScaleIn>
      }
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
  setOnboarding,
  setAddToHomeScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Layout
)
