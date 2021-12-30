import React from 'react'
import Wrap from './wrap/Wrap'
import Label from './fragments/Label'
import Error from './fragments/Error'
import InputCore, { InputProps as InputCoreProps } from './core/Input'

export interface InputProps extends Omit<InputCoreProps, 'hasError'> {
  error?: string | null
  label?: string
}

const Input = ({
  type = 'text',
  autoComplete = 'on',
  id,
  value,
  placeholder,
  error,
  disabled,
  onChange,
  onBlur,
  label,
}: InputProps) => {
  return (
    <Wrap>
      {label && <Label htmlFor={id} hasError={!!error} disabled={disabled}>{label}</Label>}
      <InputCore
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        hasError={!!error}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <Error>{error}</Error>}
    </Wrap>
  )
}

export default Input
