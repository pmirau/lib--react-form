import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../../src/hooks/useForm';
import { TYPE } from '../../src/constants/inputs';
import { validator } from '../../src/validator';

describe('useForm', () => {
  describe('register()', () => {
    let result;
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()));
    });

    it('registers a new field & initializes all default props', () => {
      act(() => {
        result.current.register('myId');
      });

      expect(result.current.form).toMatchObject({
        keys: ['myId'],
        initialValues: { myId: '' },
        values: { myId: '' },
        types: { myId: TYPE.text },
        touched: { myId: false },
        changed: { myId: false },
        errors: { myId: null },
        formHasChanged: false,
        formIsValid: true,
      });
      expect(result.current.form.validator.myId).toBeInstanceOf(Object);
    });

    it('registers a new field & initializes all custom props', () => {
      act(() => {
        result.current.register('myId', {
          initialValue: '7',
          type: TYPE.number,
          touched: true,
          changed: true,
          validation: {
            max: 6,
          },
        });
      });

      expect(result.current.form).toMatchObject({
        keys: ['myId'],
        initialValues: { myId: '7' },
        values: { myId: '7' },
        types: { myId: TYPE.number },
        touched: { myId: true },
        changed: { myId: true },
        errors: { myId: 'Bitte gebe maximal die Zahl 6 ein' },
        formHasChanged: true,
        formIsValid: false,
      });
      expect(result.current.form.validator.myId).toBeInstanceOf(Object);
    });

    it('throws Error when field with id already exists', () => {
      act(() => {
        result.current.register('myId');
        result.current.register('myId');
      });

      // eslint-disable-next-line quotes
      expect(result.error).toEqual(Error(`A field with the id 'myId' already exists`));
    });
  });

  describe('unregister()', () => {
    let result;
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()));
    });

    it('removes all field-related data & keep unrelated data', () => {
      act(() => {
        result.current.register('myFirstId');
        result.current.register('mySecondId');
        result.current.unregister('myFirstId');
      });

      expect(result.current.form).toMatchObject({
        keys: ['mySecondId'],
        initialValues: { mySecondId: '' },
        values: { mySecondId: '' },
        types: { mySecondId: TYPE.text },
        touched: { mySecondId: false },
        changed: { mySecondId: false },
        errors: { mySecondId: null },
        formHasChanged: false,
        formIsValid: true,
      });
      expect(result.current.form.validator.mySecondId).toBeInstanceOf(Object);
    });

    it('sets global form properties correctly 1/2', () => {
      act(() => {
        result.current.register('myFirstId', {
          type: TYPE.number,
          changed: true,
          validation: { min: 3 },
        });
        result.current.register('mySecondId');
        result.current.unregister('myFirstId');
      });

      expect(result.current.form.formIsValid).toBe(true);
      expect(result.current.form.formHasChanged).toBe(false);
    });

    it('sets global form properties correctly 2/2', () => {
      act(() => {
        result.current.register('myFirstId');
        result.current.register('mySecondId', {
          type: TYPE.number,
          changed: true,
          validation: { min: 3, required: true },
        });
        result.current.unregister('myFirstId');
      });

      expect(result.current.form.formIsValid).toBe(false);
      expect(result.current.form.formHasChanged).toBe(true);
    });
  });

  describe('changeValue()', () => {
    let result;
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()));
    });

    it('throws when field does not exist', () => {
      act(() => {
        result.current.changeValue('myId', 1);
      });

      // eslint-disable-next-line quotes
      expect(result.error).toEqual(Error(`A field with the id 'myId' does not exist`));
    });

    it('updates all fields correctly (+error)', () => {
      act(() => {
        result.current.register('myFirstId');
        result.current.register('mySecondId', {
          type: TYPE.text,
          initialValue: 'abc',
          validation: { minLength: 3 },
        });
        result.current.changeValue('mySecondId', 'ab');
      });

      expect(result.current.form).toMatchObject({
        keys: ['myFirstId', 'mySecondId'],
        initialValues: { myFirstId: '', mySecondId: 'abc' },
        values: { myFirstId: '', mySecondId: 'ab' },
        types: { myFirstId: TYPE.text, mySecondId: TYPE.text },
        touched: { myFirstId: false, mySecondId: false },
        changed: { myFirstId: false, mySecondId: true },
        errors: { myFirstId: null, mySecondId: 'Bitte gebe mindestens 3 Zeichen ein' },
        formHasChanged: true,
        formIsValid: false,
      });
    });

    it('restores \'changed\' when initialValue is entered again', () => {
      act(() => {
        result.current.register('myThirdId', {
          type: TYPE.text,
          initialValue: 'hello',
        });
        result.current.changeValue('myThirdId', 'world');
        result.current.changeValue('myThirdId', 'hello');
      });

      expect(result.current.form.changed).toHaveProperty('myThirdId', false);
      expect(result.current.form.formHasChanged).toBe(false);
    });
  });

  describe('touch()', () => {
    let result;
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()));
    });

    it('should set touch-prop to true when touched', () => {
      act(() => {
        result.current.register('myFirstId');
        result.current.touch('myFirstId');
      });

      expect(result.current.form.touched).toHaveProperty('myFirstId', true);
    });
  });

  describe('validation', () => {
    let result;
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()));
    });

    it('applies default validation when no validation-options passed', () => {
      act(() => {
        result.current.register('myId', {
          type: TYPE.number,
          initialValue: 'abc',
        });
      });

      expect(result.current.form.errors).toHaveProperty('myId', 'Bitte gebe eine gültige Zahl ein');
    });

    it('applies preconfigured validation rules, when passed as options', () => {
      act(() => {
        result.current.register('myId', {
          type: TYPE.number,
          initialValue: 49,
          validation: {
            min: 50,
          },
        });
      });

      expect(result.current.form.errors).toHaveProperty('myId', 'Bitte gebe mindestens die Zahl 50 ein');
    });

    it('overrides validation, when custom validator is passed', () => {
      act(() => {
        result.current.register('myId', {
          type: TYPE.number,
          initialValue: 'abc',
          validationSchema: validator.string.min(3),
        });
      });

      expect(result.current.form.errors).toHaveProperty('myId', null);
    });
  });
});

// describe('same with Components')
