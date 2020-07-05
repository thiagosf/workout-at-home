import React from 'react'
import { Image, Link, useColorMode } from '@chakra-ui/core'
import { transitions } from '../../ui'
import logoLight from '../../assets/svg/logo-light.svg'
import logoDark from '../../assets/svg/logo-dark.svg'

function Logo ({ onClick, title, ...props }) {
  const { colorMode } = useColorMode()
  const logo = colorMode === 'light'
    ? logoLight
    : logoDark
  return (
    <Link
      transition={transitions.common}
      onClick={onClick ? onClick : () => {}}
      display="inline-flex"
      user-select="none"
      _hover={{
        textDecoration: 'none'
      }}
      {...props}
    >
      <Image
        src={logo}
        alt={title}
        height="30px"
      />
    </Link>
  )
}

export default Logo
