import { useReducer, ChangeEvent } from 'react'
import formReducer from '../reducer/formReducer'
import { DEFAULT_VALIDATOR, DEFAULT_VALUE } from '../constants/inputs'
import { ValidationParams, Validator, InputType, InputValueType } from '../types'

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

    switch (form.types[id]) {
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
    }

    return {
      error: form.touched[id] && form.errors[id],
      value: form.values[id],
      id,
      type,
      onChange,
      onBlur,
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
