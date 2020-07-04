import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  Text,
  Image,
  useColorMode
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from './Layout'
import { Carousel } from '../Carousel'
import onboarding1 from '../../assets/svg/onboarding-1.svg'
import onboarding2 from '../../assets/svg/onboarding-2.svg'
import onboarding3 from '../../assets/svg/onboarding-3.svg'
import { colors, utils } from '../../ui'
import { setOnboarding } from '../../store/actions/base'

const OnboardingItem = ({
  title,
  description,
  image,
  ...props
}) => {
  const { colorByMode } = utils
  const { colorMode } = useColorMode()
  const titleColor = colorByMode(
    colors.green500,
    colors.green500,
    colorMode
  )
  const descriptionColor = colorByMode(
    colors.gray500,
    colors.gray500,
    colorMode
  )
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexGrow="1"
      {...props}
    >
      <Flex
        flexGrow="1"
        justifyContent="center"
        alignItems="center"
        padding="50px"
      >
        <Image src={image} />
      </Flex>
      <Text
        fontSize="30px"
        textAlign="center"
        padding="0 20px"
        margin="0"
        color={titleColor}
      >{title}</Text>
      <Text
        fontSize="20px"
        textAlign="center"
        padding="0 20px"
        margin="0"
        color={descriptionColor}
      >{description}</Text>
    </Flex>
  )
}

function Onboarding ({
  base,
  setOnboarding
}) {
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
  const { enabledSync } = base

  const onboardItems = items.map((item, index) => {
    return (
      <OnboardingItem
        key={index}
        title={item.title}
        description={item.description}
        image={item.image}
      />
    )
  })

  useEffect(() => {
    if (enabledSync) {
      setOnboarding(true)
    }
  }, [setOnboarding, enabledSync])

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
      >
        {onboardItems}
      </Carousel>
    </Layout>
  )
}

const mapStateToProps = ({ base }) => ({ base })

const mapDispatchToProps = {
  setOnboarding
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding)
