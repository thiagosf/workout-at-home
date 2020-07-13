import React, { useState } from 'react'
import {
  Flex,
  Box,
  Icon
} from '@chakra-ui/core'
import { ReactSortable } from 'react-sortablejs'

function Sortable ({
  items,
  onChange,
  ...props
}) {
  const [list, setList] = useState(items)
  let timer

  const handleChange = (sortableItems, sortable, store) => {
    if (store.dragging === null) {
      const ids = items.map(item => item.id)
      const newIds = sortableItems.map(item => item.id)
      const values = ids.map((id, index) => id === newIds[index])
      const equal = values.every(value => value === true)
      if (!equal) {
        setList(sortableItems)
        onChange(items)
      }
    }
  }

  const handleChangeThrottle = (sortableItems, sortable, store) => {
    clearInterval(timer)
    timer = setTimeout(() => handleChange(sortableItems, sortable, store), 100)
  }

  return (
    <div className="sortable" {...props}>
      <ReactSortable
        handle=".handle"
        animation={150}
        list={list}
        setList={handleChangeThrottle}
        delayOnTouchStart={false}
      >
        {list.map(item => (
          <Flex
            key={item.id}
            alignItems="center"
          >
            <Box flexGrow="1">
              {item.component({
                handle: (
                  <Icon
                    name="drag-handle"
                    className="handle swiper-no-swiping"
                    padding="20px 10px 20px 0px"
                    boxSizing="content-box"
                  />
                )
              })}
            </Box>
          </Flex>
        ))}
      </ReactSortable>
    </div>
  )
}

export default Sortable
