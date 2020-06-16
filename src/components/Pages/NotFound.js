import React from 'react'
import { Flex, Text } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'

export default function NotFound () {
  const history = useHistory()
  const mainButton = {
    label: 'Home',
    icon: 'home'
  }
  const goHome = () => history.push('/')
  return (
    <Layout
      mainButton={mainButton}
      onClickMain={goHome}
    >
      <Flex
        flexGrow="1"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="15px 15px 40px 15px"
      >
        <Text
          fontSize="64px"
        >Ops...</Text>
        <Text
          fontSize="20px"
        >This page not exists</Text>
      </Flex>
    </Layout>
  )
}
