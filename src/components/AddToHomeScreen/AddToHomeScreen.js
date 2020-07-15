import React from 'react'
import {
  Flex,
  Box,
  Image,
  Text,
  Icon,
  useColorMode
} from '@chakra-ui/core'
import favicon from '../../assets/svg/logo-small.svg'
import { colors, utils } from '../../ui'

function AddToHomeScreen ({
  onCloseAddToHomeScreen,
  children,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const textColor = valueByMode(
    colors.gray900,
    colors.white,
    colorMode
  )
  const background = valueByMode(
    colors.gray200,
    colors.gray900,
    colorMode
  )
  const iconBackground = valueByMode(
    colors.gray300,
    colors.black,
    colorMode
  )
  const boxShadow = valueByMode(
    '0 2px 27px rgba(0, 0, 0, 0.3), 0 1px 0 0 rgba(0, 0, 0, 0.2) inset',
    '0 2px 27px rgba(0, 0, 0, 0.3), 0 1px 0 0 rgba(255, 255, 255, 0.2) inset',
    colorMode
  )

  return (
    <Box
      background={background}
      rounded="30px"
      padding="20px"
      boxShadow={boxShadow}
      {...props}
    >
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        position="relative"
      >
        <Icon
          position="absolute"
          top="0px"
          right="0px"
          name="close"
          onClick={onCloseAddToHomeScreen}
        />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginRight="20px"
        >
          <Box
            rounded="15px"
            width="60px"
            height="60px"
            padding="10px"
            background={iconBackground}
            flexShrink="0"
          >
            <Image
              src={favicon}
              alt="Web app icon"
            />
          </Box>
        </Flex>
        <Flex
          flexGrow="1"
          flexDirection="column"
        >
          <Text
            fontSize="20px"
            lineHeight="1"
            fontWeight="600"
            color={textColor}
            paddingRight="25px"
            margin="0 0 5px 0"
          >Save to home screen</Text>
          <Text
            fontSize="16px"
            color={textColor}
          >Have an amazing experience, tap the menu icon at the top of your browser and choose "Add to Home Screen".</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default AddToHomeScreen
