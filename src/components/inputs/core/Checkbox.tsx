import React, { ChangeEventHandler, FocusEventHandler } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.scss'

export interface CheckboxProps {
  id: string,
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  disabled?: boolean
  checked?: boolean
  hasError?: boolean
}

// TODO Clicks not working without the wrapped label (with htmlFor set) bc of styling
const Checkbox = ({
  id,
  onChange,
  onBlur,
  checked,
  hasError,
  disabled,
}: CheckboxProps) => {
  return (
    <span className={styles.input}>
      <input
        className={styles.input__input}
        id={id}
        name={id}
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
        disabled={disabled}
      />
      <span
        className={cn(
          styles.input__control,
          {
            [styles.input__control_hasError]: hasError,
            [styles.input__control_isDisabled]: disabled,
          },
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            d="M1.73 12.91l6.37 6.37L22.79 4.59"
          />
        </svg>
      </span>
    </span>
  )
}

export default Checkbox
