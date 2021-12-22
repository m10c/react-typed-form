// @flow

import type { ErrorFields, FormErrors } from '../types';

type State<T> = $ReadOnly<{|
  values: T,
  errors: FormErrors<T>,
  lastErrors: FormErrors<T>,
  dirty: Array<$Keys<T>>,
  loading: boolean,
|}>;

type Action<T, K: $Keys<T> = empty> =
  | $ReadOnly<{|
      type: 'VALUE_CHANGE',
      payload: $ReadOnly<{|
        name: K,
        value: $ElementType<T, K>,
        // Only set if validateOnChange or field is set to revalidate
        errors: FormErrors<T> | void,
      |}>,
    |}>
  | $ReadOnly<{|
      type: 'SUBMIT',
      payload: $ReadOnly<{|
        errors: FormErrors<T>,
      |}>,
    |}>
  | $ReadOnly<{|
      type: 'RESET',
      payload: $ReadOnly<{|
        values: T,
        errors: FormErrors<T>,
      |}>,
    |}>
  | $ReadOnly<{|
      type: 'SET_LOADING',
      payload: boolean,
    |}>
  | $ReadOnly<{|
      type: 'ADD_SUBMIT_ERROR',
      payload: $ReadOnly<{| name: $Keys<ErrorFields<T>>, error: string |}>,
    |}>;

export default function reducer<T: { ... }>(
  state: State<T>,
  action: Action<T>
): State<T> {
  switch (action.type) {
    case 'VALUE_CHANGE': {
      const { name, value, errors } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
        dirty: [...state.dirty.filter((d) => d !== name), name],
        ...(errors && { errors }),
      };
    }
    case 'SUBMIT':
      return {
        ...state,
        errors: action.payload.errors,
        lastErrors: action.payload.errors,
        dirty: [],
      };
    case 'RESET':
      return {
        ...action.payload,
        lastErrors: {},
        dirty: [],
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'ADD_SUBMIT_ERROR': {
      const { name, error } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: [...(state.errors[name] || []), error],
        },
        lastErrors: {
          ...state.lastErrors,
          [name]: [...(state.lastErrors[name] || []), error],
        },
      };
    }
    default:
      (action: empty);
      return state;
  }
}
