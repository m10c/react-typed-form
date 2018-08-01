// @flow
/* eslint-disable flowtype/generic-spacing */

// Helper for applying to a model which we're building a form around
export type $Optional<T: {}> = $Shape<$ObjMap<T, <V>(V) => V | void>>;

export type ErrorFields<T> = { ...T, _form?: empty };

/**
 * T represents the guaranteed object shape your form is providing on
 * successful submission.  Similar to React props/state, you are typing for the
 * ideal end state, after defaults etc have been incorporated.
 *
 * If a user has filled out the form with data that won't match the types, the
 * localised validation errors can stop things going any further.  It would be
 * good if these validations could be tied into the form components themselves.
 */
export type Options<T> = $ReadOnly<{|
  // Required
  onSubmit: (values: T, form: TypedFormProp<T>) => void | Promise<void>,

  // Optional
  pristineValues?: $Shape<T>, // Pristine values don't count as changes
  validate?: (values: T) => FormErrors<T>,
  validateOnChange?: boolean,
|}>;

export type TypedFormProp<T> = $ReadOnly<{|
  getFieldProps: GetFieldProps<T>,
  handleSubmit: () => void,
  isLoading: boolean,
  setLoading: boolean => void,
  addError: (field: $Keys<ErrorFields<T>>, error: string) => void,
  formErrorList: string[],
|}>;

export type TypedFieldProps<FTOut, FTIn = FTOut | void> = $ReadOnly<{|
  name: string,
  label: string,
  value: FTIn,
  handleValueChange: (value: FTOut) => void,
  isLoading?: boolean,
  lastErrorList?: string[],
  isValid?: boolean,
|}>;

type GetFieldProps<T> = <FK: $Keys<T>, FT: $ElementType<T, FK>>(
  field: FK
) => TypedFieldProps<FT>;

export type FormErrors<T: {}> = $ObjMap<ErrorFields<T>, () => string[] | void>;
