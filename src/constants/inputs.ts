import { validator } from '../validator'
import { InputType, InputValueType, Validator } from '../types'
import { customMessagesDE } from '../validator/errorMessages'

/**
 * Default value for input types
 */
export const DEFAULT_VALUE: Readonly<InputValueType> = {
  text: '',
  number: '',
  checkbox: false,
  checkboxGroup: [],
  radio: false,
  // Is empty (i.e. no button selected), but should be an error, since radio should always have
  // a selected item
  radioGroup: '',
}

export const DEFAULT_VALIDATOR: Readonly<{ [key in InputType]: Validator }> = {
  text: validator.string.empty(''),
  number: validator.number.empty(''),
  checkbox: validator.boolean,
  checkboxGroup: validator.array.items(validator.string),
  radio: validator.boolean,
  radioGroup: validator.string.min(1)
    .messages({ 'string.empty': customMessagesDE.radioGroupRequired! }),
}

// TODO Default HTML attributes for validators (eg. required)
