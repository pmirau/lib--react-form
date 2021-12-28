import React from 'react'
import styles from './Error.module.scss'

interface ErrorProps {
  children: string
}

const Error = ({ children }: ErrorProps) => {
  return (
    <div className={styles.error}>
      {children}
    </div>
  )
}

export default Error
