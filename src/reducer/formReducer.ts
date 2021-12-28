import { assembleValidator, validateField } from '../validator'
import { hasSome, isEqual, removePropFromObject } from '../utils/formReducer'
import { InputType, InputValueType, ValidationParams, Validator, Form } from '../types'

interface Payload {
  id: string
  type: InputType
  initialValue: InputValueType[keyof InputValueType]
  value: InputValueType[keyof InputValueType]
  touched: boolean
  changed: boolean
  validation: ValidationParams
  validationSchema: Validator
}

type ActionType =
  | { type: "register"; payload: Omit<Payload, 'value'> }
  | { type: "unregister"; payload: Pick<Payload, 'id'> }
  | { type: "changeValue"; payload: Pick<Payload, 'id' | 'value'> }
  | { type: "touch"; payload: Pick<Payload, 'id'> }

export default function formReducer(state: Form, action: ActionType): Form {
  switch (action.type) {
    case 'register': {
      const {
        id,
        initialValue,
        type,
        touched,
        changed,
        validation,
        validationSchema,
      } = action.payload

      if (state.keys.includes(id)) {
        throw new Error(`A field with the id '${id}' already exists`)
      }

      const validator = assembleValidator(validationSchema, validation)
      const error = validateField(validator, initialValue)

      return {
        ...state,
        keys: [...state.keys, id],
        initialValues: {
          ...state.initialValues,
          [id]: initialValue,
        },
        values: {
          ...state.values,
          [id]: initialValue,
        },
        types: {
          ...state.types,
          [id]: type,
        },
        touched: {
          ...state.touched,
          [id]: touched,
        },
        changed: {
          ...state.changed,
          [id]: changed,
        },
        validators: {
          ...state.validators,
          [id]: validator,
        },
        errors: {
          ...state.errors,
          [id]: error,
        },
        formHasChanged: changed || state.formHasChanged,
        formIsValid: !error && state.formIsValid,
      }
    }

    case 'unregister': {
      const { id } = action.payload

      const sanitizedErrors = removePropFromObject(id, state.errors)
      const sanitizedChanged = removePropFromObject(id, state.changed)

      return {
        keys: state.keys.filter((key) => key !== id),
        initialValues: removePropFromObject(id, state.initialValues),
        values: removePropFromObject(id, state.values),
        types: removePropFromObject(id, state.types),
        touched: removePropFromObject(id, state.touched),
        validators: removePropFromObject(id, state.validators),
        changed: sanitizedChanged,
        errors: sanitizedErrors,
        formIsValid: state.formIsValid || !hasSome(sanitizedErrors),
        formHasChanged: !state.formHasChanged ? false : hasSome(sanitizedChanged),
      }
    }

    case 'changeValue': {
      const { id, value } = action.payload

      if (!state.keys.includes(id)) {
        throw new Error(`A field with the id '${id}' does not exist`)
      }

      const error = validateField(state.validators[id], value)
      const hasChanged = !isEqual(state.initialValues[id], value)
      const updatedErrors = { ...state.errors, [id]: error }
      const updatedChanged = { ...state.changed, [id]: hasChanged }

      return {
        ...state,
        values: {
          ...state.values,
          [id]: value,
        },
        changed: updatedChanged,
        errors: updatedErrors,
        formIsValid: (!!error || state.formIsValid)
          ? !(error)
          : !hasSome(updatedErrors),
        formHasChanged: (hasChanged || !state.formHasChanged)
          ? hasChanged
          : hasSome(updatedChanged),
      }
    }

    case 'touch': {
      const { id } = action.payload

      return {
        ...state,
        touched: {
          ...state.touched,
          [id]: true,
        },
      }
    }

    default:
      return state
  }
}
