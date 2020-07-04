import React, { useEffect } from 'react'
import {
  Flex,
  Box,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { colors } from '../../ui'

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

const scaleVariants = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 0.5
    }
  },
  hidden: {
    scale: 0.5,
    opacity: 0
  }
}

const iconVariants = {
  visible: {
    x: 0,
    y: 0,
    rotate: 0,
    origin: 0,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 0.8
    }
  },
  hidden: {
    y: 100,
    x: 300,
    rotate: 90,
    opacity: 0,
    origin: 1000
  }
}

const MotionContainer = motion.custom(Flex)
const MotionBox = motion.custom(Box)

function Finish ({
  ...props
}) {
  const allColors = {
    yeah: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    waterText: {
      normal: {
        light: colors.gray500,
        dark: colors.gray400
      }
    },
    waterIcon: {
      normal: {
        light: colors.gray900,
        dark: colors.white
      }
    },
    seeYou: {
      normal: {
        light: colors.green500,
        dark: colors.green500
      }
    }
  }

  const { colorMode } = useColorMode()
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const yeahColor = resolveColor('yeah', 'normal')
  const waterTextColor = resolveColor('waterText', 'normal')
  const waterIconColor = resolveColor('waterIcon', 'normal')
  const seeYouColor = resolveColor('seeYou', 'normal')
  const containerControls = useAnimation()

  useEffect(() => {
    containerControls.start('visible')
  }, [containerControls])

  return (
    <MotionContainer
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      initial={false}
      animate={containerControls}
      variants={containerVariants}
      {...props}
    >
      <MotionBox
        variants={scaleVariants}
        initial="hidden"
      >
        <Text
          lineHeight="1"
          color={yeahColor}
          fontSize="70px"
          margin="0 0 10px 0"
          fontWeight="600"
        >Yeahhh!</Text>
      </MotionBox>
      <MotionBox
        variants={scaleVariants}
        initial="hidden"
      >
        <Text
          lineHeight="1"
          color={waterTextColor}
          fontSize="20px"
          margin="0 0 20px 0"
        >How about some water?!</Text>
      </MotionBox>
      <Flex
        width="100%"
        overflow="hidden"
        justifyContent="center"
      >
        <MotionBox
          variants={iconVariants}
          initial="hidden"
        >
          <Icon
            name="waterGlass"
            size="220px"
            color={waterIconColor}
          />
        </MotionBox>
      </Flex>
      <MotionBox
        variants={scaleVariants}
        initial="hidden"
      >
        <Text
          lineHeight="1"
          color={seeYouColor}
          fontSize="30px"
          margin="0 0 10px 0"
        >See you tomorrow!</Text>
      </MotionBox>
    </MotionContainer>
  )
}

export default Finish
