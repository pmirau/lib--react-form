import React from 'react'
import Input, { InputProps } from './Input'

interface InputSelectorProps extends InputProps {
}

/**
 * Renders a wrapped input component based on inputType.
 * Designed for dynamic input creation (For example via fetching from an API).
 */
const InputSelector = (props: InputSelectorProps) => {
  switch (props.type) {
    case 'text':
    case 'number':
      return <Input {...props} />
    default:
      return <Input {...props} />
  }
}

export default InputSelector
