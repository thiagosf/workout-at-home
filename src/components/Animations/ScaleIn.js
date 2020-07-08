import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'

const variants = ({ hiddenProps, visibleProps }) => ({
  hidden: {
    opacity: 0,
    scale: 0.98,
    ...hiddenProps
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    },
    ...visibleProps
  }
})

const MotionBox = motion.custom(Box)

function ScaleIn ({
  children,
  visible = true,
  hiddenProps = {},
  visibleProps = {},
  ...props
}) {
  const controls = useAnimation()

  useEffect(() => {
    if (visible) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [visible, controls])

  return (
    <MotionBox
      variants={variants({ hiddenProps, visibleProps })}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ScaleIn
