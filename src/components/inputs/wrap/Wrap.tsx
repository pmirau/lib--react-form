import React, { ReactNode } from 'react'
import styles from './Wrap.module.scss'

interface WrapProps {
  children: ReactNode
}

const Wrap = ({ children }: WrapProps) => {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
  )
}

export default Wrap
