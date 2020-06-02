import React, { useState } from 'react'
import '../../../node_modules/swiper/css/swiper.min.css'
import Swiper from 'react-id-swiper'
import {
  Box
} from '@chakra-ui/core'
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
    <Box {...props}>
      <Swiper
        {...defaultConfig}
        {...config}
      >
        {children}
      </Swiper>
      {count &&
        <PagingDots currentPage={page} pages={count} />
      }
    </Box>
  )
}

export default Carousel
