import Joi from 'joi'
import errorMessages, { customMessagesDE } from './errorMessages'
import { Validator, ValidationParams } from '../types'

const customJoi = Joi.defaults((schema) => schema.options({
  errors: { language: 'de' },
  // @ts-ignore - reason: language-key is invalid according to ts, but required in this code
  messages: errorMessages,
}))

/**
 * Create a JOI validator from a schema & plain attributes
 * @param schema - the base JOI schema
 * @param params
 */
export const assembleValidator = (schema: Validator, params: ValidationParams): Validator => {
  let assembledValidator = schema

  if (params.required !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.required())
  }
  if (params.min !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.number().min(params.min))
  }
  if (params.max !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.number().max(params.max))
  }
  if (params.minLength !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.string().min(params.minLength))
  }
  if (params.maxLength !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.string().max(params.maxLength))
  }
  if (params.pattern !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.string().pattern(params.pattern))
  }
  if (params.checked !== undefined) {
    if (params.checked) {
      assembledValidator = assembledValidator.concat(customJoi.boolean().valid(true)
        .messages({ 'any.only': customMessagesDE.checked!.true }))
    } else {
      assembledValidator = assembledValidator.concat(customJoi.boolean().valid(false)
        .messages({ 'any.only': customMessagesDE.checked!.false }))
    }
  }
  if (params.minCheckedItems !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.array().min(params.minCheckedItems))
  }
  if (params.maxCheckedItems !== undefined) {
    assembledValidator = assembledValidator.concat(customJoi.array().max(params.maxCheckedItems))
  }

  return assembledValidator
}

/**
 * Validate a single field
 * @param schema - schema to validate against
 * @param value - value to validate
 * @return error message when invalid; null when valid
 */
export const validateField = (schema: Validator, value: any): string | null => {
  if (!schema) return null

  // Use following to debug the error message key
  // console.log(schema.validate(value).error)

  const { error } = schema.validate(value)
  return error?.message ?? null
}

export const validator = customJoi.types()
