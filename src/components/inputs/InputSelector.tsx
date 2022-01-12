import React from 'react'
import Input, { InputProps } from './Input'
import Checkbox, { CheckboxProps } from './Checkbox'
import { InputType } from '../../types'
import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup'
import RadioGroup, { RadioGroupProps } from './RadioGroup'

interface ISInputProps extends InputProps {
}

interface ISCheckboxProps extends CheckboxProps {
  type: Extract<InputType, 'checkbox' >
}

interface ISCheckboxGroupProps extends CheckboxGroupProps {
  type: Extract<InputType, 'checkboxGroup' >
}

interface ISRadioGroup extends RadioGroupProps {
  type: Extract<InputType, 'radioGroup' >
}

type ISProps =
  | ISInputProps
  | ISCheckboxProps
  | ISCheckboxGroupProps
  | ISRadioGroup

/**
 * Renders a wrapped input component based on inputType.
 * Designed for dynamic input creation (For example via fetching from an API).
 */
const InputSelector = ({ type, ...rest }: ISProps) => {
  switch (type) {
    case 'text':
    case 'number':
      return <Input {...{ type, ...rest } as ISInputProps} />
    case 'checkbox':
      return <Checkbox {...rest as ISCheckboxProps} />
    case 'checkboxGroup':
      return <CheckboxGroup {...rest as ISCheckboxGroupProps} />
    case 'radioGroup':
      return <RadioGroup {...rest as ISRadioGroup} />
    default:
      throw new Error('InputSelector requires parameter "type"')
  }
}

export default InputSelector
