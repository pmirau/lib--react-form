import {
  renderHook,
  act,
  RenderResult,
} from '@testing-library/react-hooks'
import useForm from '../../src/hooks/useForm'
import { validator } from '../../src/validator'
import { Form } from '../../src/types'
import { customMessagesDE } from '../../src/validator/errorMessages'

describe('useForm', () => {
  describe('register()', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('registers a new field & initializes all default props 1/2', () => {
      act(() => {
        result.current.register('myText')
        result.current.register('myNumber', { type: 'number' })
        result.current.register('myCheckbox', { type: 'checkbox' })
        result.current.register('myCheckboxGroup', { type: 'checkboxGroup' })
        result.current.register('myRadio', { type: 'radio' })
        result.current.register('myRadioGroup', { type: 'radioGroup', initialValue: 'button1' })
      })

      expect(result.current.form).toMatchObject({
        keys: [
          'myText',
          'myNumber',
          'myCheckbox',
          'myCheckboxGroup',
          'myRadio',
          'myRadioGroup',
        ],
        initialValues: {
          myText: '',
          myNumber: '',
          myCheckbox: false,
          myCheckboxGroup: [],
          myRadio: false,
          myRadioGroup: 'button1',
        },
        values: {
          myText: '',
          myNumber: '',
          myCheckbox: false,
          myCheckboxGroup: [],
          myRadio: false,
          myRadioGroup: 'button1',
        },
        types: {
          myText: 'text',
          myNumber: 'number',
          myCheckbox: 'checkbox',
          myCheckboxGroup: 'checkboxGroup',
          myRadio: 'radio',
          myRadioGroup: 'radioGroup',
        },
        touched: {
          myText: false,
          myNumber: false,
          myCheckbox: false,
          myCheckboxGroup: false,
          myRadio: false,
          myRadioGroup: false,
        },
        changed: {
          myText: false,
          myNumber: false,
          myCheckbox: false,
          myCheckboxGroup: false,
          myRadio: false,
          myRadioGroup: false,
        },
        validators: {
          myText: expect.any(Object),
          myNumber: expect.any(Object),
          myCheckbox: expect.any(Object),
          myCheckboxGroup: expect.any(Object),
          myRadio: expect.any(Object),
          myRadioGroup: expect.any(Object),
        },
        errors: {
          myText: null,
          myNumber: null,
          myCheckbox: null,
          myCheckboxGroup: null,
          myRadio: null,
          myRadioGroup: null,
        },
        formHasChanged: false,
        formIsValid: true,
      } as Form)
    })

    it('registers a new field & initializes all default props 2/2 (requires radioGroup to always have a value)', () => {
      // Reason is that non-selected radio buttons should not exist, bc bad usability
      act(() => {
        result.current.register('myRadioGroup', { type: 'radioGroup' })
      })

      expect(result.current.form).toMatchObject({
        keys: [
          'myRadioGroup',
        ],
        initialValues: {
          myRadioGroup: '',
        },
        values: {
          myRadioGroup: '',
        },
        types: {
          myRadioGroup: 'radioGroup',
        },
        touched: {
          myRadioGroup: false,
        },
        changed: {
          myRadioGroup: false,
        },
        validators: {
          myRadioGroup: expect.any(Object),
        },
        errors: {
          myRadioGroup: customMessagesDE.radioGroupRequired,
        },
        formHasChanged: false,
        formIsValid: false,
      } as Form)
    })

    it('registers a new field & initializes all custom props', () => {
      act(() => {
        result.current.register('myId', {
          initialValue: '7',
          type: 'number',
          touched: true,
          changed: true,
          validation: {
            max: 6,
          },
        })
      })

      expect(result.current.form).toMatchObject({
        keys: ['myId'],
        initialValues: { myId: '7' },
        values: { myId: '7' },
        types: { myId: 'number' },
        touched: { myId: true },
        changed: { myId: true },
        validators: expect.any(Object),
        errors: { myId: 'Bitte gebe maximal die Zahl 6 ein' },
        formHasChanged: true,
        formIsValid: false,
      } as Form)
    })

    it('throws Error when field with id already exists', () => {
      act(() => {
        result.current.register('myId')
        result.current.register('myId')
      })

      expect(result.error).toEqual(Error('A field with the id \'myId\' already exists'))
    })

    it('returns the correct properties depending on the input type', () => {
      let text;
      let number;
      let checkbox;
      let checkboxGroup;
      let radio;
      let radioGroup;

      const sharedProps = {
        error: null,
      }

      act(() => {
        text = result.current.register('myText')
        number = result.current.register('myNumber', { type: 'number' })
        checkbox = result.current.register('myCheckbox', { type: 'checkbox' })
        checkboxGroup = result.current.register('myCheckboxGroup', {
          type: 'checkboxGroup',
          initialValue: ['checkbox1', 'checkbox2'],
        })
        radio = result.current.register('myRadio', { type: 'radio' })
        radioGroup = result.current.register('myRadioGroup', { type: 'radioGroup' })
      })

      expect(text).toMatchObject({
        ...sharedProps,
        onChange: expect.any(Function),
        onBlur: expect.any(Function),
        value: '',
        id: 'myText',
        type: 'text',
      })
      expect(number).toMatchObject({
        ...sharedProps,
        onChange: expect.any(Function),
        onBlur: expect.any(Function),
        value: '',
        id: 'myNumber',
        type: 'number',
      })
      expect(checkbox).toMatchObject({
        ...sharedProps,
        onChange: expect.any(Function),
        onBlur: expect.any(Function),
        checked: false,
        id: 'myCheckbox',
        type: 'checkbox',
      })
      expect(checkboxGroup).toMatchObject({
        ...sharedProps,
        changeValue: expect.any(Function),
        touch: expect.any(Function),
        value: ['checkbox1', 'checkbox2'],
        id: 'myCheckboxGroup',
        type: 'checkboxGroup',
      })
      expect(radio).toMatchObject({
        ...sharedProps,
        onChange: expect.any(Function),
        onBlur: expect.any(Function),
        checked: false,
        id: 'myRadio',
        type: 'radio',
      })
      expect(radioGroup).toMatchObject({
        ...sharedProps,
        changeValue: expect.any(Function),
        touch: expect.any(Function),
        value: '',
        id: 'myRadioGroup',
        type: 'radioGroup',
      })
    })
  })

  describe('unregister()', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('removes all field-related data & keep unrelated data', () => {
      act(() => {
        result.current.register('myFirstId')
        result.current.register('mySecondId')
        result.current.unregister('myFirstId')
      })

      expect(result.current.form).toMatchObject({
        keys: ['mySecondId'],
        initialValues: { mySecondId: '' },
        values: { mySecondId: '' },
        types: { mySecondId: 'text' },
        touched: { mySecondId: false },
        changed: { mySecondId: false },
        validators: expect.any(Object),
        errors: { mySecondId: null },
        formHasChanged: false,
        formIsValid: true,
      } as Form)
    })

    it('sets global form properties correctly 1/2', () => {
      act(() => {
        result.current.register('myFirstId', {
          type: 'number',
          changed: true,
          validation: { min: 3 },
        })
        result.current.register('mySecondId')
        result.current.unregister('myFirstId')
      })

      expect(result.current.form.formIsValid).toBe(true)
      expect(result.current.form.formHasChanged).toBe(false)
    })

    it('sets global form properties correctly 2/2', () => {
      act(() => {
        result.current.register('myFirstId')
        result.current.register('mySecondId', {
          type: 'number',
          changed: true,
          validation: { min: 3, required: true },
        })
        result.current.unregister('myFirstId')
      })

      expect(result.current.form.formIsValid).toBe(false)
      expect(result.current.form.formHasChanged).toBe(true)
    })
  })

  describe('changeValue()', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('throws when field does not exist', () => {
      act(() => {
        result.current.changeValue('myId', 1)
      })

      expect(result.error).toEqual(Error('A field with the id \'myId\' does not exist'))
    })

    it('updates all fields correctly (+error)', () => {
      act(() => {
        result.current.register('myFirstId')
        result.current.register('mySecondId', {
          type: 'text',
          initialValue: 'abc',
          validation: { minLength: 3 },
        })
        result.current.changeValue('mySecondId', 'ab')
      })

      expect(result.current.form).toMatchObject({
        keys: ['myFirstId', 'mySecondId'],
        initialValues: { myFirstId: '', mySecondId: 'abc' },
        values: { myFirstId: '', mySecondId: 'ab' },
        types: { myFirstId: 'text', mySecondId: 'text' },
        touched: { myFirstId: false, mySecondId: false },
        validators: expect.any(Object),
        changed: { myFirstId: false, mySecondId: true },
        errors: { myFirstId: null, mySecondId: 'Bitte gebe mindestens 3 Zeichen ein' },
        formHasChanged: true,
        formIsValid: false,
      } as Form)
    })

    it('restores \'changed\' when initialValue is entered again', () => {
      act(() => {
        result.current.register('myThirdId', {
          type: 'text',
          initialValue: 'hello',
        })
        result.current.changeValue('myThirdId', 'world')
        result.current.changeValue('myThirdId', 'hello')
      })

      expect(result.current.form.changed).toHaveProperty('myThirdId', false)
      expect(result.current.form.formHasChanged).toBe(false)
    })
  })

  describe('touch()', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('should set touch-prop to true when touched', () => {
      act(() => {
        result.current.register('myFirstId')
        result.current.touch('myFirstId')
      })

      expect(result.current.form.touched).toHaveProperty('myFirstId', true)
    })
  })

  describe('validation', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('applies default validation when no validation-options passed', () => {
      act(() => {
        result.current.register('myId', {
          type: 'number',
          initialValue: 'abc',
        })
      })

      expect(result.current.form.errors).toHaveProperty('myId', 'Bitte gebe eine gültige Zahl ein')
    })

    it('applies preconfigured validation rules, when passed as options', () => {
      act(() => {
        result.current.register('myId', {
          type: 'number',
          initialValue: 49,
          validation: {
            min: 50,
          },
        })
      })

      expect(result.current.form.errors).toHaveProperty('myId', 'Bitte gebe mindestens die Zahl 50 ein')
    })

    it('overrides validation, when custom validator is passed', () => {
      act(() => {
        result.current.register('myId', {
          type: 'number',
          initialValue: 'abc',
          validationSchema: validator.string.min(3),
        })
      })

      expect(result.current.form.errors).toHaveProperty('myId', null)
    })

    xdescribe('types', () => {
      // TODO Test validation for each types

      xit('validates checkboxGroup correctly', () => {
        // ...
      })
    })
  })

  describe('onChange()', () => {
    let result: RenderResult<any>
    beforeEach(() => {
      ({ result } = renderHook(() => useForm()))
    })

    it('updated default types correctly', () => {
      act(() => {
        result.current.register('myText')
        result.current.register('myNumber', { type: 'number' })
      })

      act(() => {
        const { onChange: onChangeText } = result.current.register('myText')
        const { onChange: onChangeNumber } = result.current.register('myNumber', { type: 'number' })

        // passes 'checked' to see that it correctly ignores this prop, since it is 'invalid' for
        // these types
        onChangeText({ target: { id: 'myText', value: 'updated value', checked: true } })
        onChangeNumber({ target: { id: 'myNumber', value: '776', checked: false } })
      })

      expect(result.current.form.values).toHaveProperty('myText', 'updated value')
      expect(result.current.form.values).toHaveProperty('myNumber', '776')
    })

    it('updates non-default types correctly', () => {
      act(() => {
        result.current.register('myCheckbox', { type: 'checkbox' })
        result.current.register('myRadio', { type: 'radio' })
      })

      act(() => {
        // register muss erneut aufgerufen werden, damit die "neue" onChange() Function mit dem
        // aktuellen form-state zurückgegeben wird (Der form-state wird innerhalb onChange()
        // aufgerufen).
        // Würde onChange vom obigen register() verwendet werden, dann ist in onChange() immer noch
        // der alte state. Also wo alles leer ist.
        const { onChange: onChangeCheckbox } = result.current.register('myCheckbox', { type: 'checkbox' })
        const { onChange: onChangeRadio } = result.current.register('myRadio', { type: 'radio' })
        onChangeCheckbox({ target: { id: 'myCheckbox', checked: true } })
        onChangeRadio({ target: { id: 'myRadio', checked: true } })
      })

      expect(result.current.form.values).toHaveProperty('myCheckbox', true)
      expect(result.current.form.values).toHaveProperty('myRadio', true)
    })

    it('updates non-onChange() (setValue()) types correctly', () => {
      act(() => {
        const { changeValue: changeValueCheckboxGroup } = result.current.register('myCheckboxGroup', {
          type: 'checkboxGroup',
          initialValues: ['checkbox1', 'checkbox2'],
        })
        const { changeValue: changeValueRadioGroup } = result.current.register('myRadioGroup', {
          type: 'radioGroup',
          initialValues: 'radio1',
        })
        changeValueCheckboxGroup('myCheckboxGroup', ['checkbox1', 'checkbox3'])
        changeValueRadioGroup('myRadioGroup', 'radio2')
      })

      expect(result.current.form.values).toHaveProperty(
        'myCheckboxGroup',
        ['checkbox1', 'checkbox3'],
      )
      expect(result.current.form.values).toHaveProperty(
        'myRadioGroup',
        'radio2',
      )
    })
  })
})

// describe('same with Components')
