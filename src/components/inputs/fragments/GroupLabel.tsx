import React from 'react'
import cn from 'classnames'
import styles from './GroupLabel.module.scss'

interface GroupLabelProps {
  children: string
  hasError?: boolean
  disabled?: boolean
}

const GroupLabel = ({
  children,
  hasError,
  disabled,
}: GroupLabelProps) => {
  return (
    <div
      className={cn(
        styles.label,
        {
          [styles.label_hasError]: hasError,
          [styles.label_isDisabled]: disabled,
        },
      )}
    >
      {children}
    </div>
  )
}

export default GroupLabel
