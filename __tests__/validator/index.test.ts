import Joi, { StringSchema } from 'joi'
import { Validator } from '../../src/types'
import { assembleValidator, validateField } from '../../src/validator'

describe('validation', () => {
  it('concats a passed schema with multiple "plain" validators', () => {
    const schema: StringSchema = Joi.string().alphanum()
    const validator: Validator = assembleValidator(schema, { minLength: 5 })

    const hasErrorAlpha = validateField(validator, 'Error --')
    const hasErrorMin = validateField(validator, 'Err')
    const hasNoError = validateField(validator, 'Validstring')

    expect(hasErrorAlpha).toEqual('Bitte gebe nur alpha-numerische Zeichen ein (a-z, A-Z, 0-9)')
    expect(hasErrorMin).toEqual('Bitte gebe mindestens 5 Zeichen ein')
    expect(hasNoError).toEqual(null)
  })

  it('throws error on incompatible types', () => {
    const schema: StringSchema = Joi.string().alphanum()
    expect(() => {
      assembleValidator(schema, { min: 5 })
    }).toThrowError()
  })

  describe('plain validators', () => {
    it('require: value is defined', () => {
      const validator: Validator = assembleValidator(Joi.string(), { required: true })

      expect(validateField(validator, 'abc')).toEqual(null)
      expect(validateField(validator, undefined)).toEqual('Dieses Feld ist erforderlich')
    })

    it('min: number is min number', () => {
      const validator: Validator = assembleValidator(Joi.number(), { min: 900 })

      expect(validateField(validator, 900)).toEqual(null)
      expect(validateField(validator, 899)).toEqual('Bitte gebe mindestens die Zahl 900 ein')
    })

    it('max: number is max number', () => {
      const validator: Validator = assembleValidator(Joi.number(), { max: 900 })

      expect(validateField(validator, 900)).toEqual(null)
      expect(validateField(validator, 901)).toEqual('Bitte gebe maximal die Zahl 900 ein')
    })

    it('minLength: string has minLength-length', () => {
      const validator: Validator = assembleValidator(Joi.string(), { minLength: 5 })

      expect(validateField(validator, 'abcde')).toEqual(null)
      expect(validateField(validator, 'abcd')).toEqual('Bitte gebe mindestens 5 Zeichen ein')
    })

    it('maxLength: string has maxLength-length', () => {
      const validator: Validator = assembleValidator(Joi.string(), { maxLength: 5 })

      expect(validateField(validator, 'abcde')).toEqual(null)
      expect(validateField(validator, 'abcdef')).toEqual('Bitte gebe maximal 5 Zeichen ein')
    })

    it('pattern: string has pattern', () => {
      const validator: Validator = assembleValidator(Joi.string(), { pattern: /[a-c]/ })

      expect(validateField(validator, 'a')).toEqual(null)
      expect(validateField(validator, 'd')).toEqual('Bitte gebe nur gültige Zeichen ein')
    })

    it('checked: checkbox is checked / boolean is true', () => {
      const validatorTrue: Validator = assembleValidator(Joi.boolean(), { checked: true })
      const validatorFalse: Validator = assembleValidator(Joi.boolean(), { checked: false })

      expect(validateField(validatorTrue, true)).toEqual(null)
      expect(validateField(validatorTrue, false)).toEqual('Dieses Feld muss ausgewählt sein')
      expect(validateField(validatorFalse, false)).toEqual(null)
      expect(validateField(validatorFalse, true)).toEqual('Dieses Feld darf nicht ausgewählt sein')
    })

    it('minCheckedItems: checkboxGroup has min selected items', () => {
      const validator: Validator = assembleValidator(Joi.array(), { minCheckedItems: 3 })

      expect(validateField(validator, ['a', 'b', 'c'])).toEqual(null)
      expect(validateField(validator, ['a', 'b']))
        .toEqual('Bitte wähle mindestens 3 Einträge aus')
    })

    it('maxCheckedItems: checkboxGroup has max selected items', () => {
      const validator: Validator = assembleValidator(Joi.array(), { maxCheckedItems: 3 })

      expect(validateField(validator, ['a', 'b', 'c'])).toEqual(null)
      expect(validateField(validator, ['a', 'b', 'c', 'd']))
        .toEqual('Bitte wähle maximal 3 Einträge aus')
    })
  })
})
