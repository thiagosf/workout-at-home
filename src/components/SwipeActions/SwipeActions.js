import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import Swiper from 'react-id-swiper'
import { motion, useAnimation } from 'framer-motion'

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

function SwipeActions ({
  children,
  context,
  visible = true,
  ...props
}) {
  const controls = useAnimation()
  useEffect(() => {
    controls.start(visible ? 'visible' : 'hidden')
  }, [visible, controls])
  return (
    <MotionBox
      variants={variants}
      animate={controls}
      initial="visible"
      {...props}
    >
      <Swiper slidesPerView="auto">
        {children}
        {context}
      </Swiper>
    </MotionBox>
  )
}

export default SwipeActions
