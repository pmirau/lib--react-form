import { AnySchema } from 'joi'

/**
 * A validator (Joi Schema)
 */
export interface Validator extends AnySchema {

}

/**
 * Validation parameters
 * @property [required]
 * @property [min] - minimum allowed number value
 * @property [max] - maximum allowed number value
 * @property [minLength] - minimum allowed string length
 * @property [maxLength] - maximum allowed string length
 * @property [pattern] - regex to test against
 */
export interface ValidationParams {
  required?: boolean,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  pattern?: RegExp,
  checked?: boolean,
  minCheckedItems?: number
  maxCheckedItems?: number
  radioGroupRequired?: boolean
}

/**
 * Input types
 */
export type InputType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'checkboxGroup'
  | 'radio'
  | 'radioGroup'

/**
 * Types for input types
 */
export interface InputValueType {
  text: string
  number: string
  checkbox: boolean
  checkboxGroup: string[]
  radio: boolean
  radioGroup: string
}

/**
 * useForm state
 */
export interface Form {
  keys: string[]
  initialValues: { [key: string]: InputValueType[keyof InputValueType] }
  values: { [key: string]: InputValueType[keyof InputValueType] }
  types: { [key: string]: InputType }
  touched: { [key: string]: boolean }
  changed: { [key: string]: boolean }
  validators: { [key: string]: Validator }
  errors: { [key: string]: string | null }
  formHasChanged: boolean
  formIsValid: boolean
}

// Public interface for inputs. Can be used by API's or DB's

// TODO Add generic to remaining properties (validation, ...)
interface BasicInput<T extends InputType> {
  type: T
  id: string
  initialValue?: InputValueType[T]
  touched?: boolean
  changed?: boolean
  validation?: ValidationParams
  validationSchema?: Validator
  label?: string
  disabled?: boolean
}

export interface TextInput extends BasicInput<'text'> {
  autoComplete?: string
  placeholder?: string
}

export interface NumberInput extends BasicInput<'number'> {
  autoComplete?: string
  placeholder?: string
}

export interface CheckboxInput extends BasicInput<'checkbox'> {
  // TODO Can probably set to optional when updated css is applied to the checkbox component
  //  (Thus fixing TS workaround in InputOverview.tsx)
  label: string
}

export interface CheckboxGroupInput extends BasicInput<'checkboxGroup'> {
  checkboxes: {
    id: string
    label: string
  }[]
}

export interface RadioInput extends BasicInput<'radio'> {}

export interface RadioGroupInput extends BasicInput<'radioGroup'> {
  buttons: {
    id: string
    label: string
  }[]
}

export type Inputs =
  | TextInput
  | NumberInput
  | CheckboxInput
  | CheckboxGroupInput
  | RadioInput
  | RadioGroupInput
