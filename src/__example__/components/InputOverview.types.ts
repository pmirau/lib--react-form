import {
  InputType,
  InputValueType,
  ValidationParams,
  Validator,
} from '../../types'

interface Group {
  id: string,
  title: string
}

interface BasicDataInput<T extends InputType> {
  type: T
  id: string
  initialValue?: InputValueType[T]
  touched?: boolean
  changed?: boolean
  validation?: ValidationParams
  validationSchema?: Validator
  label?: string
  disabled?: boolean
  autoComplete?: string
  placeholder?: string
}

export interface TextDataInput extends BasicDataInput<'text'> {
}

interface NumberDataInput extends BasicDataInput<'number'> {
}

interface CheckboxDataInput extends BasicDataInput<'checkbox'> {
}

interface CheckboxGroupDataInput extends BasicDataInput<'checkboxGroup'> {
  checkboxes: {
    id: string
    label: string
  }[]
}

export interface DataInputs {
  'text': TextDataInput
  'number': NumberDataInput
  'checkbox': CheckboxDataInput
  'checkboxGroup': CheckboxGroupDataInput
}

export interface DataInputGroup<T extends DataInputs[keyof DataInputs]> extends Group {
  inputs: T[]
}
