import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Label.module.scss'

interface LabelProps {
  htmlFor: string
  children: ReactNode
  hasError?: boolean
  disabled?: boolean
}

const Label = ({ htmlFor, hasError, disabled, children }: LabelProps) => {
  return (
    <label
      className={cn(
        styles.label,
        {
          [styles.label_hasError]: hasError,
          [styles.label_isDisabled]: disabled,
        },
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default Label
