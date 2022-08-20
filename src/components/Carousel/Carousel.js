import React, { useState } from 'react'
import '../../../node_modules/swiper/swiper.min.css'
import Swiper from 'react-id-swiper'
import { Lazy } from 'swiper'
import { Flex, Box } from '@chakra-ui/core'
import { PagingDots } from '../PagingDots'

function Carousel ({
  count,
  children,
  containerClass = 'swiper-container',
  config = {},
  onSlideChange,
  ...props
}) {
  const [page, setPage] = useState(1)
  const defaultConfig = {
    modules: [Lazy],
    lazy: {
      loadPrevNext: true,
      preloaderClass: 'preloader-carousel'
    },
    preloadImages: false,
    on: {
      observerUpdate: function (e) {
        const resize = () => {
          if (this.resize) {
            this.resize.resizeHandler()
          }
        }
        setTimeout(resize, 50)
        setTimeout(resize, 100)
      },
      slideChange: function () {
        setPage(this.snapIndex + 1)
        if (typeof onSlideChange === 'function') {
          onSlideChange(this.snapIndex)
        }
      }
    },
    observer: true,
    observeParents: true,
    centerInsufficientSlides: true
  }
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >
      <Box flexGrow="1">
        <Swiper
          flexGrow="1"
          minHeight="100%"
          containerClass={containerClass}
          {...defaultConfig}
          {...config}
        >
          {children}
        </Swiper>
      </Box>
      {count &&
        <PagingDots currentPage={page} pages={count} />
      }
    </Flex>
  )
}

export default Carousel
