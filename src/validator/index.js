import Joi from 'joi';
import errorMessages from './errorMessages';

// noinspection JSCheckFunctionSignatures
const customJoi = Joi.defaults((schema) => schema.options({
  errors: { language: 'de' },
  messages: errorMessages,
}));

/**
 * A validator (Joi Schema)
 * @typedef Validator
 * @type {AnySchema}
 */

/**
 * Validation parameters
 * @typedef ValidationParams
 * @property {boolean} required
 * @property {number} min - minimum allowed number value
 * @property {number} max - maximum allowed number value
 * @property {number} minLength - minimum allowed string length
 * @property {number} maxLength - maximum allowed string length
 * @property {RegExp} pattern - regex to test against
 */

/**
 * Create a JOI validator from a schema & plain attributes
 * @param {Validator} schema - the base JOI schema
 * @param {ValidationParams} params
 */
export const assembleValidator = (schema, params) => {
  let assembledValidator = schema;

  if (params.required) {
    assembledValidator = assembledValidator.concat(customJoi.required());
  }
  if ('min' in params) {
    assembledValidator = assembledValidator.concat(customJoi.number().min(params.min));
  }
  if ('max' in params) {
    assembledValidator = assembledValidator.concat(customJoi.number().max(params.max));
  }
  if ('minLength' in params) {
    assembledValidator = assembledValidator.concat(customJoi.string().min(params.minLength));
  }
  if ('maxLength' in params) {
    assembledValidator = assembledValidator.concat(customJoi.string().max(params.maxLength));
  }
  if ('pattern' in params) {
    assembledValidator = assembledValidator.concat(customJoi.string().pattern(params.pattern));
  }

  return assembledValidator;
};

/**
 * Validate a single field
 * @param {Validator} schema - schema to validate against
 * @param {*} value - value to validate
 * @return {string|null} - error message when invalid; null when valid
 */
export const validateField = (schema, value) => {
  if (!schema) return null;

  const { error } = schema.validate(value);
  return error?.message ?? null;
};

export const validator = customJoi.types();
