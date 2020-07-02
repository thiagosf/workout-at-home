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
  const handleChange = items => {
    setList(items)
    onChange(items)
  }

  return (
    <div className="sortable" {...props}>
      <ReactSortable
        handle=".handle"
        animation={150}
        list={list}
        setList={handleChange}
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
                    className="handle"
                    padding="20px 20px 20px 0px"
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
