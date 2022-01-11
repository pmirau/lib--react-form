import React from 'react'
import RadioCore, { RadioProps as RadioCoreProps } from './core/Radio'
import Wrap from './wrap/Wrap'
import Error from './fragments/Error'
import RadioLabel from './fragments/RadioLabel'
import styles from './Radio.module.scss'

export interface RadioProps extends Omit<RadioCoreProps, 'hasError'> {
  label?: string
  error?: string | boolean
}

const Radio = ({
  id,
  name,
  onChange,
  onBlur,
  checked,
  error,
  disabled,
  label,
}: RadioProps) => {
  return (
    <Wrap>
      <div className={styles.radio}>
        <RadioCore
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          checked={checked}
          hasError={!!error}
          disabled={disabled}
        />
        {label && (
          <RadioLabel htmlFor={id} disabled={disabled} hasError={!!error}>
            {label}
          </RadioLabel>
        )}
      </div>
      {error && typeof error === 'string' && <Error>{error}</Error>}
    </Wrap>
  )
}

export default Radio
