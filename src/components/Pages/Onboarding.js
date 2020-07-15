import React, { useState } from 'react'
import {
  Flex,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { Carousel } from '../Carousel'
import { ComposableScaleIn } from '../Animations'
import onboarding1 from '../../assets/svg/onboarding-1.svg'
import onboarding2 from '../../assets/svg/onboarding-2.svg'
import onboarding3 from '../../assets/svg/onboarding-3.svg'
import { colors, utils } from '../../ui'

const OnboardingItem = ({
  visible = false,
  title,
  description,
  image,
  ...props
}) => {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const titleColor = valueByMode(
    colors.green500,
    colors.green500,
    colorMode
  )
  const descriptionColor = valueByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )
  return (
    <ComposableScaleIn.Container
      visible={visible}
      width="100%"
      height="100%"
      {...props}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexGrow="1"
        height="100%"
      >
        <ComposableScaleIn.Item
          display="flex"
          flexGrow="1"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Flex
            backgroundImage={`url(${image})`}
            backgroundPosition="center center"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            flexGrow="1"
            alignSelf="stretch"
            margin="50px"
          />
        </ComposableScaleIn.Item>
        <ComposableScaleIn.Item>
          <Text
            fontSize="30px"
            textAlign="center"
            padding="0 20px"
            margin="0"
            color={titleColor}
          >{title}</Text>
        </ComposableScaleIn.Item>
        <ComposableScaleIn.Item>
          <Text
            fontSize="20px"
            textAlign="center"
            padding="0 20px"
            margin="0"
            color={descriptionColor}
          >{description}</Text>
        </ComposableScaleIn.Item>
      </Flex>
    </ComposableScaleIn.Container>
  )
}

function Onboarding () {
  const history = useHistory()
  const mainButton = {
    label: 'Skip',
    icon: 'arrowRight'
  }
  const goHome = () => history.push('/')
  const items = [{
    title: 'Welcome!',
    description: 'Let\'s train!',
    image: onboarding1
  }, {
    title: 'Make your list',
    description: 'Pick up your favorites exercises and set up',
    image: onboarding2
  }, {
    title: 'We take care of time',
    description: 'Focus on exercise and us on your time',
    image: onboarding3
  }]
  const [slideIndex, setSlideIndex] = useState(0)

  const onboardItems = items.map((item, index) => {
    return (
      <OnboardingItem
        key={index}
        visible={+slideIndex === +index}
        title={item.title}
        description={item.description}
        image={item.image}
      />
    )
  })

  return (
    <Layout
      mainButton={mainButton}
      onClickMain={goHome}
    >
      <Carousel
        page={1}
        count={3}
        flexGrow="1"
        marginBottom="25px"
        onSlideChange={setSlideIndex}
        height="100%"
      >
        {onboardItems}
      </Carousel>
    </Layout>
  )
}

export default Onboarding
