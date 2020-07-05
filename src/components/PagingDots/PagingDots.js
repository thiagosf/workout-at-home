import React from 'react'
import {
  Flex,
  Box,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function PagingDots ({ pages, currentPage, ...props }) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()

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
    const background = valueByMode(
      !isCurrent ? colors.gray300 : colors.gray600,
      !isCurrent ? colors.gray600 : colors.gray300,
      colorMode
    )
    const textColor = valueByMode(
      !isCurrent ? colors.gray600 : colors.gray300,
      !isCurrent ? colors.gray300 : colors.gray600,
      colorMode
    )
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
        transition='background 300ms ease-out'
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
      {...props}
    >
      {dots}
    </Flex>
  )
}

export default PagingDots
