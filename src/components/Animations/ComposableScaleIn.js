import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import { motion, useAnimation } from 'framer-motion'

const buildContainerVariants = ({ visibleProps, hiddenProps }) => ({
  visible: {
    transition: {
      staggerChildren: 0.15
    },
    ...visibleProps
  },
  hidden: {
    ...hiddenProps
  }
})

const buildItemVariants = ({ visibleProps, hiddenProps }) => ({
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 0.5
    },
    ...visibleProps
  },
  hidden: {
    scale: 0.5,
    opacity: 0,
    ...hiddenProps
  }
})

const MotionBox = motion.custom(Box)

export function Container ({
  visibleProps = {},
  hiddenProps = {},
  visible = true,
  children,
  ...props
}) {
  const containerVariants = buildContainerVariants({
    visibleProps,
    hiddenProps
  })
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
      initial='hidden'
      animate={controls}
      variants={containerVariants}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export function Item ({
  children,
  visibleProps = {},
  hiddenProps = {},
  ...props
}) {
  const itemVariants = buildItemVariants({
    visibleProps,
    hiddenProps
  })

  return (
    <MotionBox
      variants={itemVariants}
      initial="hidden"
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default {
  Container,
  Item
}
