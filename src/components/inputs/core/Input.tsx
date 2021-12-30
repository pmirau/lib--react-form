import React, { ChangeEventHandler, FocusEventHandler } from 'react'
import cn from 'classnames'
import styles from './Input.module.scss'
import { InputType, InputValueType } from '../../../types'

export interface InputProps {
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  disabled?: boolean
  hasError?: boolean
  type: Extract<InputType, 'text' | 'number' >
  autoComplete?: string
  value?: InputValueType['text' | 'number']
  placeholder?: InputValueType['text' | 'number']
}

const Input = ({
  type = 'text',
  autoComplete = 'on',
  id,
  value,
  placeholder,
  hasError,
  disabled,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <input
      className={cn(
        styles.input,
        {
          [styles.input_hasError]: hasError,
          [styles.input_isDisabled]: disabled,
        },
      )}
      id={id}
      type={type}
      name={id}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default Input
