import { useReducer, ChangeEvent } from 'react'
import formReducer from '../reducer/formReducer'
import { DEFAULT_VALIDATOR, DEFAULT_VALUE } from '../constants/inputs'
import {
  ValidationParams,
  Validator,
  InputType,
  InputValueType,
} from '../types'

// errors: Either `errors.key: <falsy>` or key not defined for non-error

interface RegisterOptions {
  type?: InputType
  initialValue?: InputValueType[keyof InputValueType]
  touched?: boolean
  changed?: boolean
  validation?: ValidationParams
  validationSchema?: Validator
}

export default function useForm() {
  // noinspection JSCheckFunctionSignatures
  const [form, dispatch] = useReducer(formReducer, {
    keys: [],
    initialValues: {},
    values: {},
    types: {},
    touched: {},
    changed: {},
    validators: {},
    errors: {},
    formHasChanged: false,
    formIsValid: true,
  })

  const unregister = (id: string): void => {
    // noinspection JSCheckFunctionSignatures
    dispatch({ type: 'unregister', payload: { id } })
  }

  /**
   * Change the value of a field
   */
  const changeValue = (id: string, value: InputValueType[keyof InputValueType]): void => {
    // noinspection JSCheckFunctionSignatures
    dispatch({
      type: 'changeValue',
      payload: { id, value },
    })
  }

  /**
   * Touch a field
   */
  const touch = (id: string): void => {
    // noinspection JSCheckFunctionSignatures
    dispatch({
      type: 'touch',
      payload: { id },
    })
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id } = event.target
    let value

    switch (form.types[id] as InputType) {
      case 'checkbox':
        value = event.target.checked
        break
      default:
        value = event.target.value
    }

    changeValue(id, value)
  }

  const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id } = event.target
    touch(id)
  }

  /**
   * Add a field
   * @param id
   * @param [initialValue]
   * @param [type=text] - input type
   * @param [touched=false] - set 'touched' prop
   * @param [changed=false] - set 'changed' prop
   * @param [validation] - plain validation params
   * @param [validationSchema] - JOI validation schema. Defaults to respective type default
   * @throws when field with id already exists
   */
  const register = (
    id: string,
    {
      type = 'text',
      initialValue = DEFAULT_VALUE[type],
      touched = false,
      changed = false,
      validation = {},
      validationSchema = DEFAULT_VALIDATOR[type],
    }: RegisterOptions = {},
  ) => {
    let value = form.values[id]
    const sharedReturnProps = {
      error: form.touched[id] ? form.errors[id] : null,
      id,
      type,
    }

    if (!form.keys.includes(id)) {
      // noinspection JSCheckFunctionSignatures
      dispatch({
        type: 'register',
        payload: {
          id,
          initialValue,
          type,
          touched,
          changed,
          validation,
          validationSchema,
        },
      })

      // Return initial value on first register. Otherwise, value will always be undefined
      // since dispatch is async and the field is not registered yet (i.e. doesn't exist in state)
      value = initialValue
    }

    switch (type) {
      case 'checkbox':
        return {
          ...sharedReturnProps,
          checked: value as InputValueType['checkbox'],
          type,
          onChange,
          onBlur,
        }
      case 'checkboxGroup':
        return {
          ...sharedReturnProps,
          value: value as InputValueType['checkboxGroup'],
          type,
          changeValue,
          touch,
        }
      default:
        return {
          ...sharedReturnProps,
          value: value as
            InputValueType[keyof Pick<InputValueType,
            | 'text'
            | 'number'>],
          type,
          onChange,
          onBlur,
        }
    }
  }

  return {
    form,
    register,
    unregister,
    changeValue,
    touch,
  }
}
