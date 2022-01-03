import React, { ChangeEvent } from 'react'
import { InputValueType } from '../../types'
import Checkbox from './Checkbox'
import GroupLabel from './fragments/GroupLabel'
import Wrap from './wrap/Wrap'
import Error from './fragments/Error'

// TODO new structure for error and disabled -> single checkboxes
export interface CheckboxGroupProps {
  id: string,
  value: string[]
  changeValue: (id: string, value: InputValueType[keyof InputValueType]) => void
  touch: (id: string) => void
  // group label
  label?: string,
  error?: string | null
  checkboxes: {
    id: string,
    label: string,
  }[]
  disabled?: boolean
}

const CheckboxGroup = ({
  id,
  value,
  changeValue,
  touch,
  label,
  error,
  checkboxes,
  disabled,
}: CheckboxGroupProps) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id: checkboxID, checked } = event.target

    if (checked) {
      changeValue(id, [...value, checkboxID])
    } else {
      changeValue(id, value.filter((v) => v !== checkboxID))
    }
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
      {checkboxes.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          id={checkbox.id}
          onChange={onChange}
          onBlur={onBlur}
          label={checkbox.label}
          checked={value.indexOf(checkbox.id) !== -1}
          error={!!error}
          disabled={disabled}
        />
      ))}
      {error && <Error>{error}</Error>}
    </Wrap>
  )
}

export default CheckboxGroup
