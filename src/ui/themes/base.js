import { theme } from '@chakra-ui/core'
import customIcons from './custom_icons'

const base = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons,
  },
  fonts: {
    heading: '"Baloo 2", system-ui, sans-serif',
    body: '"Baloo 2", system-ui, sans-serif',
    mono: '"Baloo 2", system-ui, sans-serif'
  }
}

export default base
