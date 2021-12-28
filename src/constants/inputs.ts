import { validator } from '../validator'
import { InputType, InputValueType, Validator } from '../types'

/**
 * Default value for input types
 */
export const DEFAULT_VALUE: Readonly<InputValueType> = {
  text: '',
  number: '',
}

export const DEFAULT_VALIDATOR: Readonly<{ [key in InputType]: Validator }> = {
  text: validator.string.empty(''),
  number: validator.number.empty(''),
}

// TODO Default HTML attributes for validators (eg. required)
