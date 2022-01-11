import React from 'react'
import cn from 'classnames'
import styles from './RadioLabel.module.scss'

interface RadioLabelProps {
  children: string
  htmlFor: string
  hasError?: boolean
  disabled?: boolean
}

const RadioLabel = ({
  children,
  htmlFor,
  hasError,
  disabled,
}: RadioLabelProps) => {
  return (
    <label
      className={cn(
        styles.label,
        {
          [styles.label__label_isDisabled]: disabled,
          [styles.label__label_hasError]: hasError,
        },
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default RadioLabel
