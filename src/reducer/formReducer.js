import { assembleValidator, validateField } from '../validator';
import { hasSome, isEqual, removePropFromObject } from '../utils/formReducer';

export default function formReducer(state, action) {
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
      } = action.payload;

      if (state.keys.includes(id)) {
        throw new Error(`A field with the id '${id}' already exists`);
      }

      const validator = assembleValidator(validationSchema, validation);
      const error = validateField(validator, initialValue);

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
        validator: {
          ...state.validator,
          [id]: validator,
        },
        errors: {
          ...state.errors,
          [id]: error,
        },
        formHasChanged: changed || state.formHasChanged,
        formIsValid: !error && state.formIsValid,
      };
    }

    case 'unregister': {
      const { id } = action.payload;

      const sanitizedErrors = removePropFromObject(id, state.errors);
      const sanitizedChanged = removePropFromObject(id, state.changed);

      return {
        keys: state.keys.filter((key) => key !== id),
        initialValues: removePropFromObject(id, state.initialValues),
        values: removePropFromObject(id, state.values),
        types: removePropFromObject(id, state.types),
        touched: removePropFromObject(id, state.touched),
        validator: removePropFromObject(id, state.validator),
        changed: sanitizedChanged,
        errors: sanitizedErrors,
        formIsValid: state.formIsValid || !hasSome(sanitizedErrors),
        formHasChanged: !state.formHasChanged ? false : hasSome(sanitizedChanged),
      };
    }

    case 'changeValue': {
      const { id, value } = action.payload;

      if (!state.keys.includes(id)) {
        throw new Error(`A field with the id '${id}' does not exist`);
      }

      const error = validateField(state.validator[id], value);
      const hasChanged = !isEqual(state.initialValues[id], value);
      const updatedErrors = { ...state.errors, [id]: error };
      const updatedChanged = { ...state.changed, [id]: hasChanged };

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
      };
    }

    case 'touch': {
      const { id } = action.payload;

      return {
        ...state,
        touched: {
          ...state.touched,
          [id]: true,
        },
      };
    }

    default:
      return state;
  }
}
