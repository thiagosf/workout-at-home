import { theme } from '@chakra-ui/core'
import customIcons from './custom_icons'
import colors from '../colors'

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
  },
  colors: {
    ...theme.colors,
    blue: {
      ...theme.colors.blue,
      '500': colors.blue500
    },
    gray: {
      ...theme.colors.gray,
      '100': colors.gray200,
      '300': colors.gray300
    }
  }
}

export default base
