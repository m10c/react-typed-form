// @flow

import type {
  ErrorFields,
  FormErrors,
  Options,
  TypedFieldProp,
  TypedFormProp,
} from './types';

import * as React from 'react';

type InvalidFields<T> = Array<$Keys<ErrorFields<T>>>;

export default function useForm<T: {}>({
  defaultValues: defaultValuesOriginal,
  onSubmit,
  pristineValues,
  validate,
  validateOnChange,
}: Options<T>): TypedFormProp<T> {
  // $FlowFixMe
  const defaultValues: T = defaultValuesOriginal || {};
  const [values, setValues] = React.useState<T>(defaultValues);

  const determineInvalid = (): InvalidFields<T> => {
    return validate && validateOnChange ? Object.keys(validate(values)) : [];
  };

  const [invalid, setInvalid] = React.useState<InvalidFields<T>>(
    determineInvalid()
  );
  const [lastErrors, setLastErrors] = React.useState<FormErrors<T>>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  function handleValueChange<FK: string & $Keys<T>, FT: $ElementType<T, FK>>(
    name: FK,
    value: FT
  ): void {
    // Callback style to avoid race condition
    // $FlowFixMe
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // TODO: Doesn't depend on new values properly, might need a reducer
    setInvalid(determineInvalid());
  }

  function getFieldProp<FK: string & $Keys<T>, FT: $ElementType<T, FK>>(
    name: FK
  ): TypedFieldProp<FT> {
    const pristine = pristineValues;

    let value = values[name];
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
      isLoading: loading,
      isValid: validateOnChange && !invalid.includes(name),
      lastErrorList: lastErrors[name],
    };
  }

  /**
   * Keep this async and return true on successful submit so that users can
   * await it.
   */
  async function handleSubmit(): Promise<boolean> {
    let errors = {};
    if (validate) {
      errors = validate(values);
    }

    setLastErrors(errors);
    if (Object.keys(errors).length > 0) return false;

    // TODO: This needs to be deferred into the callback, otherwise lastErrors
    // used by the form prop will be stale
    await onSubmit(values, prepareFormProp());
    return true;
  }

  function prepareFormProp(): TypedFormProp<T> {
    return {
      getField: getFieldProp,
      handleSubmit,
      isLoading: loading,
      setLoading,
      addError: (name, error) => {
        // $FlowFixMe
        setLastErrors((prevState) => ({
          ...prevState,
          [name]: [...(prevState[name] || []), error],
        }));
      },
      formErrorList: lastErrors._form || [],
      values,
      reset: () => setValues(defaultValues),
    };
  }

  return prepareFormProp();
}
