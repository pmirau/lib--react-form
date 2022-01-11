import React, { ChangeEvent } from 'react'
import { InputValueType } from '../../types'
import Wrap from './wrap/Wrap'
import GroupLabel from './fragments/GroupLabel'
import Error from './fragments/Error'
import Radio from './Radio'

// TODO new structure for error and disabled -> single buttons
export interface RadioGroupProps {
  id: string,
  value: InputValueType['radioGroup']
  changeValue: (id: string, value: InputValueType['radioGroup']) => void
  touch: (id: string) => void
  // group label
  label?: string,
  error?: string | null
  buttons: {
    id: string,
    label: string,
  }[]
  disabled?: boolean
}
const RadioGroup = ({
  id,
  value,
  changeValue,
  touch,
  label,
  error,
  buttons,
  disabled,
}: RadioGroupProps) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id: buttonID, checked } = event.target

    if (checked) changeValue(id, buttonID)
  }

  const onBlur = (): void => {
    touch(id)
  }

  return (
    <Wrap>
      {label && (
        <GroupLabel hasError={!!error} disabled={disabled}>
          {label}
        </GroupLabel>
      )}
      {buttons.map((button) => (
        <Radio
          id={button.id}
          name={id}
          label={button.label}
          onChange={onChange}
          onBlur={onBlur}
          checked={button.id === value}
          disabled={disabled}
          error={!!error}
        />
      ))}
      {error && <Error>{error}</Error>}
    </Wrap>
  )
}

export default RadioGroup
