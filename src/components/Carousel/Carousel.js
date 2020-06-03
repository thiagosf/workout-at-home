import React, { useState } from 'react'
import '../../../node_modules/swiper/css/swiper.min.css'
import Swiper from 'react-id-swiper'
import { Flex } from '@chakra-ui/core'
import { PagingDots } from '../PagingDots'

function Carousel ({
  count,
  children,
  config = {},
  ...props
}) {
  const [page, setPage] = useState(1)
  const defaultConfig = {
    lazy: {
      loadPrevNext: true,
      preloaderClass: 'preloader-carousel'
    },
    preloadImages: false,
    on: {
      slideChange: function () {
        setPage(this.snapIndex + 1)
      }
    },
    observer: true,
    observeParents: true
  }
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >
      <Flex
        minWidth="0"
        flexGrow="1"
      >
        <Swiper
          flexGrow="1"
          minHeight="100%"
          background="blue"
          {...defaultConfig}
          {...config}
        >
          {children}
        </Swiper>
      </Flex>
      {count &&
        <PagingDots currentPage={page} pages={count} />
      }
    </Flex>
  )
}

export default Carousel
