import React from 'react'
import CheckboxCore, { CheckboxProps as CheckboxCoreProps } from './core/Checkbox'
import Error from './fragments/Error'
import Wrap from './wrap/Wrap'
import CheckboxLabel from './fragments/CheckboxLabel'

export interface CheckboxProps extends Omit<CheckboxCoreProps, 'hasError'> {
  // Required, bc CheckboxCore not clickable without a label
  label: string
  error?: string | boolean | null
}

const Checkbox = ({
  id,
  onChange,
  onBlur,
  checked,
  error,
  disabled,
  label,
}: CheckboxProps) => {
  return (
    <Wrap>
      <CheckboxLabel label={label} htmlFor={id} disabled={disabled} hasError={!!error}>
        <CheckboxCore
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          checked={checked}
          hasError={!!error}
          disabled={disabled}
        />
      </CheckboxLabel>
      {error && typeof error === 'string' && <Error>{error}</Error>}
    </Wrap>
  )
}

export default Checkbox
