// @flow

import type { FormErrors, Options, FieldProp, FormObject } from './types';

import * as React from 'react';

import reducer from './core/reducer';

export default function useForm<T: {}>({
  defaultValues = {},
  onSubmit,
  pristineValues,
  validator,
  alwaysRevalidateOnChange,
  revalidateFields,
  preValidateTransform,
  postValidateTransform,
}: Options<T>): FormObject<T> {
  function determineErrors(values: T): FormErrors<T> {
    if (!validator) return {};

    const transformed = preValidateTransform?.(values) ?? values;
    /* eslint-disable flowtype/no-weak-types */
    return Object.fromEntries(
      (Object.entries((validator(transformed): any)).filter(
        ([, v]) => (v: any)?.length > 0
      ): any)
    );
    /* eslint-enable flowtype/no-weak-types */
  }

  const [state, dispatch] = React.useReducer(
    reducer,
    {
      values: defaultValues,
      errors: determineErrors(defaultValues),
      lastErrors: {},
      dirty: [],
      loading: false,
    },
    undefined
  );

  function handleValueChange<FK: string & $Keys<T>, FT: $ElementType<T, FK>>(
    name: FK,
    value: FT
  ): void {
    const errors =
      alwaysRevalidateOnChange || revalidateFields?.includes(name)
        ? determineErrors({ ...state.values, [name]: value })
        : undefined;
    dispatch({ type: 'VALUE_CHANGE', payload: { name, value, errors } });
  }

  function getFieldProp<FK: string & $Keys<T>, FT: $ElementType<T, FK>>(
    name: FK
  ): FieldProp<FT> {
    const pristine = pristineValues;

    let value = state.values[name];
    if (value === undefined && pristine && pristine[name] !== undefined) {
      value = pristine[name];
    }

    // Add spaces and capitalize for label
    let label = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return {
      name,
      label,
      value,
      handleValueChange: handleValueChange.bind(null, name),
      isDirty: state.dirty.includes(name),
      isLoading: state.loading,
      errorList: state.errors[name],
      lastErrorList: state.lastErrors[name],
    };
  }

  /**
   * Keep this async and return true on successful submit so that users can
   * await it.
   */
  async function handleSubmit(): Promise<boolean> {
    const errors = determineErrors(state.values);

    dispatch({ type: 'SUBMIT', payload: { errors } });
    if (Object.keys(errors).length > 0) return false;

    let transformed = (preValidateTransform || ((x) => x))(state.values);
    transformed = (postValidateTransform || ((x) => x))(transformed);

    const result = await onSubmit(transformed, prepareFormProp());
    return result === false ? false : true;
  }

  function prepareFormProp(): FormObject<T> {
    return {
      getField: getFieldProp,
      handleSubmit,
      isLoading: state.loading,
      setLoading: (value: boolean) =>
        dispatch({ type: 'SET_LOADING', payload: value }),
      addSubmitError: (name, error) => {
        dispatch({
          type: 'ADD_SUBMIT_ERROR',
          payload: { name, error },
        });
      },
      formErrorList: state.lastErrors._form || [],
      values: state.values,
      reset: () =>
        dispatch({
          type: 'RESET',
          payload: {
            values: defaultValues,
            errors: determineErrors(defaultValues),
          },
        }),
      errors: state.errors,
      lastErrors: state.lastErrors,
      hasErrors: Object.keys(state.errors).length > 0,
      hasLastErrors: Object.keys(state.lastErrors).length > 0,
    };
  }

  return prepareFormProp();
}
