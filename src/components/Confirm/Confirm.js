import React from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorMode,
  Scale
} from '@chakra-ui/core'
import { colors, utils } from '../../ui'

function Confirm ({
  isOpen,
  cancelRef,
  onConfirm,
  onClose,
  title,
  text,
  buttonNo,
  buttonYes,
  ...props
}) {
  const { valueByMode } = utils
  const { colorMode } = useColorMode()
  const background = valueByMode(
    colors.white,
    colors.gray800,
    colorMode
  )

  return (
    <Scale in={isOpen}>
      {styles => (
        <AlertDialog
          isOpen={true}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          {...props}
        >
          <AlertDialogOverlay />
          <AlertDialogContent
            background={background}
            rounded="20px"
            margin="0 20px"
            {...styles}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="600">
              {title}
            </AlertDialogHeader>
            <AlertDialogBody>
              {text}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="link" ref={cancelRef} onClick={onClose}>
                {buttonNo}
              </Button>
              <Button
                onClick={onConfirm} ml={3}
                backgroundColor={colors.red500}
                color={colors.white}
                _hover={{ backgroundColor: colors.red800 }}
                _active={{ backgroundColor: colors.red800 }}
              >
                {buttonYes}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Scale>
  )
}

export default Confirm
