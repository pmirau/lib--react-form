import { validator } from '../validator';

/**
 * Input types
 * @readonly
 * @enum {string}
 */
export const TYPE = {
  text: 'text',
  number: 'number',
};

/**
 * Default value for corresponding TYPE
 * @readonly
 * @type {{}}
 */
export const DEFAULT_VALUE = {
  text: '',
  number: '',
};

export const DEFAULT_VALIDATOR = {
  text: validator.string.empty(''),
  number: validator.number.empty(''),
};

// TODO Default HTML attributes for validators (eg. required)
