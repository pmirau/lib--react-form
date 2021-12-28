import { validateField } from '../../src/validator'
import { DEFAULT_VALIDATOR, DEFAULT_VALUE } from '../../src/constants/inputs'
import { InputType } from '../../src/types'

describe('DEFAULT_VALIDATOR', () => {
  describe('text', () => {
    const type: InputType = 'text'

    it('is valid with DEFAULT_VALUE', () => {
      const error = validateField(DEFAULT_VALIDATOR[type], DEFAULT_VALUE[type])
      expect(error).toBe(null)
    })
  })

  describe('number', () => {
    const type: InputType = 'number'

    it('is valid with DEFAULT_VALUE', () => {
      const error = validateField(DEFAULT_VALIDATOR[type], DEFAULT_VALUE[type])
      expect(error).toBe(null)
    })
  })
})
