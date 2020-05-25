import React from 'react'
import {
  Flex,
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors } from '../../ui'

function PagingDots ({ pages, currentPage }) {
  const { colorMode } = useColorMode()
  const allColors = {
    background: {
      normal: {
        light: colors.gray300,
        dark: colors.gray600
      },
      active: {
        light: colors.gray600,
        dark: colors.gray300
      }
    },
    text: {
      normal: {
        light: colors.gray600,
        dark: colors.gray300
      },
      active: {
        light: colors.gray300,
        dark: colors.gray600
      }
    }
  }
  const resolveColor = (name, state) => allColors[name][state][colorMode]
  const max = 7
  let firstPage = currentPage - 3
  let lastPage = currentPage + 3

  if (firstPage < 1) {
    firstPage = 1
    lastPage = max
  }
  if (lastPage > pages) {
    lastPage = pages
    firstPage = pages - (max - 1)
    if (firstPage < 1) {
      firstPage = 1
    }
  }
  const startNumber = firstPage

  const dots = Array(Math.min(pages, max)).fill().map((_, index) => {
    const number = index + startNumber
    const isCurrent = number === currentPage
    const state = isCurrent ? 'active' : 'normal'
    const background = resolveColor('background', state)
    const textColor = resolveColor('text', state)
    const dotNumber = isCurrent
      ? <Text
          as="small"
          color={textColor}
        >{number}</Text>
      : null
    const dotWidth = isCurrent ? null : '5px'
    const dotHeight = isCurrent ? '20px' : '5px'
    const dotPadding = isCurrent ? '0px 8px' : null
    return (
      <Box
        key={number}
        background={background}
        width={dotWidth}
        height={dotHeight}
        padding={dotPadding}
        margin="5px"
        rounded="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >{dotNumber}</Box>
    )
  })
  return (
    <Flex
      padding="5px"
      justifyContent="center"
      alignItems="center"
    >
      {dots}
    </Flex>
  )
}

export default PagingDots
