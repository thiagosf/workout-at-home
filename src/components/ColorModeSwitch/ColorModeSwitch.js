import React, { forwardRef } from 'react'
import {
  Box,
  ControlBox,
  VisuallyHidden,
  Icon
} from '@chakra-ui/core'
import { useColorMode } from '@chakra-ui/core'
import { colors } from '../../ui'

const switchSizes = {
  sm: {
    width: '1.375rem',
    height: '0.75rem',
  },
  md: {
    width: '1.875rem',
    height: '1rem',
  },
  lg: {
    width: '2.875rem',
    height: '1.5rem',
  },
}

// Coping from chrakra, changin only icon inside switch
const ColorModeSwitch = forwardRef(
  (
    {
      id,
      name,
      value,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      color,
      defaultIsChecked,
      isChecked,
      size,
      isDisabled,
      isInvalid,
      onChange,
      onBlur,
      onFocus,
      children,
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode()
    const width = switchSizes[size] && switchSizes[size]['width']
    const height = switchSizes[size] && switchSizes[size]['height']

    const stylesProps = {
      rounded: 'full',
      justifyContent: 'flex-start',
      width,
      height,
      bg: colorMode === 'light'
        ? colors.gray300
        : colors.gray600,
      boxSizing: 'content-box',
      p: '2px',
      _checked: {
        bg: colorMode === 'light'
          ? colors.green500
          : colors.green800,
      },
      _child: {
        transform: `translateX(0)`,
      },
      _checkedAndChild: {
        transform: `translateX(calc(${width} - ${height}))`,
      },
      _focus: {
        boxShadow: 'outline',
      },
      _hover: {
        cursor: 'pointer',
      },
      _checkedAndHover: {
        cursor: 'pointer',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    }

    return (
      <Box as='label' display='inline-block' verticalAlign='middle' {...rest}>
        <VisuallyHidden
          as='input'
          type='checkbox'
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={isInvalid}
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
        />
        <ControlBox {...stylesProps}>
          <Box
            bg='white'
            transition='transform 250ms'
            rounded='full'
            size={height}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="moon" color="gray.700" />
          </Box>
        </ControlBox>
      </Box>
    )
  },
)

ColorModeSwitch.displayName = 'ColorModeSwitch'

ColorModeSwitch.defaultProps = {
  color: 'gray',
  size: 'lg',
}

export default ColorModeSwitch
