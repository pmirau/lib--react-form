import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './LabelCheckbox.module.scss'

interface LabelCheckboxProps {
  htmlFor: string
  hasError?: boolean
  disabled?: boolean
  children: ReactNode
  label: string
}

/**
 * Label designed for checkbox, where the checkbox is passed as child
 */
const LabelCheckbox = ({
  label,
  htmlFor,
  disabled,
  hasError,
  children,
}: LabelCheckboxProps) => {
  return (
    <label
      className={styles.label}
      htmlFor={htmlFor}
    >
      {children}
      <span
        className={cn(
          styles.label__label,
          {
            [styles.label__label_isDisabled]: disabled,
            [styles.label__label_hasError]: hasError,
          },
        )}
      >
        {label}
      </span>
    </label>
  )
}

export default LabelCheckbox
