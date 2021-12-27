import { useReducer } from 'react';
import formReducer from '../reducer/formReducer';
import { DEFAULT_VALIDATOR, DEFAULT_VALUE, TYPE } from '../constants/inputs';
// errors: Either `errors.key: <falsy>` or key not defined for non-error

export default function useForm() {
  // noinspection JSCheckFunctionSignatures
  const [form, dispatch] = useReducer(formReducer, {
    keys: [],
    initialValues: {},
    values: {},
    types: {},
    touched: {},
    changed: {},
    validator: {},
    errors: {},
    formHasChanged: false,
    formIsValid: true,
  });

  const unregister = (id) => {
    // noinspection JSCheckFunctionSignatures
    dispatch({ type: 'unregister', payload: { id } });
  };

  /**
   * Change the value of a field
   * @param {string} id
   * @param {*} value
   */
  const changeValue = (id, value) => {
    // noinspection JSCheckFunctionSignatures
    dispatch({
      type: 'changeValue',
      payload: { id, value },
    });
  };

  /**
   * Touch a field
   * @param {string} id
   */
  const touch = (id) => {
    // noinspection JSCheckFunctionSignatures
    dispatch({
      type: 'touch',
      payload: { id },
    });
  };

  const onChange = (event) => {
    const { id } = event.target;
    let value;

    switch (form.types[id]) {
      default:
        value = event.target.value;
    }

    changeValue(id, value);
  };

  const onBlur = (event) => {
    const { id } = event.target;
    touch(id);
  };

  /**
   * Add a field
   * @param id
   * @param {any} [initialValue]
   * @param {TYPE} [type=text] - input type
   * @param {boolean} [touched=false] - set 'touched' prop
   * @param {boolean} [changed=false] - set 'changed' prop
   * @param {ValidationParams} [validation] - plain validation params
   * @param {Validator} [validationSchema] - JOI validation schema. Defaults to respective type
   *   default
   * @throws when field with id already exists
   */
  const register = (
    id,
    {
      type = TYPE.text,
      initialValue = DEFAULT_VALUE[type],
      touched = false,
      changed = false,
      validation = {},
      validationSchema = DEFAULT_VALIDATOR[type],
    } = {},
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
      });
    }

    return {
      error: form.touched[id] && form.errors[id],
      value: form.values[id],
      id,
      type,
      onChange,
      onBlur,
    };
  };

  return {
    form,
    register,
    unregister,
    changeValue,
    touch,
  };
}
