import React from 'react'
import { Flex } from '@chakra-ui/core'
import TabBarBackground from './TabBarBackground'
import TabBarButton from './TabBarButton'
import TabBarMainButton from './TabBarMainButton'

function TabBar ({
  leftButton,
  rightButton,
  mainButton,
  onClick,
  onClickMainButton,
  ...props
}) {
  return (
    <Flex
      position="relative"
      {...props}
    >
      <Flex
        position="relative"
        flexGrow="1"
        zIndex="1"
        justifyContent="space-between"
        alignItems="flex-end"
        padding="5px"
      >
        <Flex minWidth="100px">
          {leftButton &&
            <TabBarButton
              counter={leftButton.counter}
              icon={leftButton.icon}
              onClick={onClick}
            >{leftButton.label}</TabBarButton>
          }
        </Flex>
        <TabBarMainButton
          position="relative"
          top="-15px"
          onClick={onClickMainButton}
          icon={mainButton.icon}
        >{mainButton.label}</TabBarMainButton>
        <Flex
          minWidth="100px"
          justifyContent="flex-end"
        >
          {rightButton &&
            <TabBarButton
              counter={rightButton.counter}
              icon={rightButton.icon}
              onClick={onClick}
            >{rightButton.label}</TabBarButton>
          }
        </Flex>
      </Flex>
      <TabBarBackground
        position="absolute"
        zIndex="0"
        left="0"
        right="0"
        bottom="0"
        height="80px"
      />
    </Flex>
  )
}

export default TabBar
