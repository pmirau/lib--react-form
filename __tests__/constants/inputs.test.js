import { validateField } from '../../src/validator';
import { DEFAULT_VALIDATOR, TYPE, DEFAULT_VALUE } from '../../src/constants/inputs';

describe('DEFAULT_VALIDATOR', () => {
  describe('text', () => {
    const type = TYPE.text;

    it('is valid with DEFAULT_VALUE', () => {
      const error = validateField(DEFAULT_VALIDATOR[type], DEFAULT_VALUE[type]);
      expect(error).toBe(null);
    });
  });

  describe('number', () => {
    const type = TYPE.number;

    it('is valid with DEFAULT_VALUE', () => {
      const error = validateField(DEFAULT_VALIDATOR[type], DEFAULT_VALUE[type]);
      expect(error).toBe(null);
    });
  });
});
