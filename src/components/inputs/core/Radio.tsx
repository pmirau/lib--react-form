import React, { ChangeEventHandler, FocusEventHandler } from 'react'
import cn from 'classnames'
import styles from './Radio.module.scss'

export interface RadioProps {
  id: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  disabled?: boolean
  checked?: boolean
  hasError?: boolean
}

// Based on https://moderncss.dev/pure-css-custom-styled-radio-buttons/
const Radio = ({
  id,
  name,
  onChange,
  onBlur,
  checked,
  hasError,
  disabled,
}: RadioProps) => {
  return (
    <input
      className={cn(
        styles.radio__input,
        {
          [styles.radio__input_hasError]: hasError,
          [styles.radio__input_disabled]: disabled,
        },
      )}
      id={id}
      name={name}
      type="radio"
      onChange={onChange}
      onBlur={onBlur}
      checked={checked}
      disabled={disabled}
    />
  )
}

export default Radio
