import React from 'react'
import Input, { InputProps } from './Input'
import Checkbox, { CheckboxProps } from './Checkbox'
import { InputType } from '../../types'

interface ISInputProps extends InputProps {
}

interface ISCheckboxProps extends CheckboxProps {
  type: Extract<InputType, 'checkbox' >
}

/**
 * Renders a wrapped input component based on inputType.
 * Designed for dynamic input creation (For example via fetching from an API).
 */
const InputSelector = ({ type, ...rest }: ISInputProps | ISCheckboxProps) => {
  switch (type) {
    case 'text':
    case 'number':
      return <Input type={type} {...rest} />
    case 'checkbox':
      // @ts-ignore - reason: ts somehow doesn't like spreading -> doesn't recognize,
      // that label is always required when type is 'checkbox'
      return <Checkbox {...rest} />
    default:
      throw new Error('InputSelector requires parameter "type"')
  }
}

export default InputSelector
