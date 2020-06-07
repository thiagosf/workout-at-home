const baseColors = {
  // neutral
  black: 'black',
  white: 'white',
  whiteOpacity100: 'rgba(255, 255, 255, 0.1)',
  whiteOpacity200: 'rgba(255, 255, 255, 0.2)',
  whiteOpacity300: 'rgba(255, 255, 255, 0.3)',
  whiteOpacity400: 'rgba(255, 255, 255, 0.4)',
  whiteOpacity500: 'rgba(255, 255, 255, 0.5)',
  whiteOpacity700: 'rgba(255, 255, 255, 0.7)',
  blackOpacity700: 'rgba(0, 0, 0, 0.7)',
  transparent: 'transparent',

  // 200
  gray200: '#EDEDED',
  blue200: '#B3DFFC',
  red200: '#F7BFBF',
  green200: '#AFF4D4',

  // 300
  gray300: '#D0D0D0',
  blue300: '#67B4E5',
  red300: '#F58484',
  green300: '#7EE2B3',

  // 400
  gray400: '#B7B7B7',
  blue400: '#479FD6',
  red400: '#F06969',
  green400: '#60CE9B',

  // 500
  gray500: '#969696',
  blue500: '#2B86BF',
  red500: '#DD4545',
  green500: '#43B781',

  // 600
  gray600: '#555555',

  // 800
  gray800: '#333333',
  blue800: '#0C5A8B',
  red800: '#AD1515',
  green800: '#138650',

  // 900
  gray900: '#1D1D1D',
  blue900: '#042234',
  red900: '#5C0909',
  green900: '#04381F'
}

export default {
  ...baseColors,

  // 200
  default200: baseColors.gray200,
  primary200: baseColors.blue200,
  danger200: baseColors.red200,
  success200: baseColors.green200,

  // 300
  default300: baseColors.gray300,
  primary300: baseColors.blue300,
  danger300: baseColors.red300,
  success300: baseColors.green300,

  // 400
  default400: baseColors.gray400,
  primary400: baseColors.blue400,
  danger400: baseColors.red400,
  success400: baseColors.green400,

  // 500
  default: baseColors.gray500,
  primary: baseColors.blue500,
  danger: baseColors.red500,
  success: baseColors.green500,

  // 600
  default600: baseColors.gray600,

  // 800
  default800: baseColors.gray800,
  primary800: baseColors.blue800,
  danger800: baseColors.red800,
  success800: baseColors.green800,

  // 900
  default900: baseColors.gray900,
  primary900: baseColors.blue900,
  danger900: baseColors.red900,
  success900: baseColors.green900
}
