import React from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorMode
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
  const { colorByMode } = utils
  const { colorMode } = useColorMode()
  const background = colorByMode(
    colors.white,
    colors.gray800,
    colorMode
  )

  return (
    <React.Fragment>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        {...props}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          background={background}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>
            {text}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {buttonNo}
            </Button>
            <Button variantColor="red" onClick={onConfirm} ml={3}>
              {buttonYes}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}

export default Confirm
