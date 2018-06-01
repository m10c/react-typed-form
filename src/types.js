// @flow
/* eslint-disable flowtype/generic-spacing */

// Helper for applying to a model which we're building a form around
export type $Optional<T: {}> = $Shape<$ObjMap<T, <V>(V) => V | void>>;

export type ErrorFields<T> = { ...T, _form?: empty };

export type Options<T> = $ReadOnly<{|
  // Required
  onSubmit: (values: T, form: TypedFormProp<T>) => void | Promise<void>,

  // Optional
  pristineValues?: $Shape<T>, // Pristine values don't count as changes
  validate?: (values: T) => FormErrors<T>,
  validateOnChange?: boolean,
|}>;

export type TypedFormProp<T> = $ReadOnly<{|
  getFieldProps: GetFieldProps<T, *, *>,
  handleSubmit: () => void,
  isLoading: boolean,
  setLoading: boolean => void,
  addError: (field: $Keys<ErrorFields<T>>, error: string) => void,
  formErrorList: string[],
|}>;

export type TypedFieldProps<FT> = $ReadOnly<{|
  name: string,
  label: string,
  value: FT,
  handleValueChange: (value: FT) => void,
  isLoading?: boolean,
  lastErrorList?: string[],
  isValid?: boolean,
|}>;

type GetFieldProps<T, FK: $Keys<T>, FT: $ElementType<T, FK>> = (
  field: FK
) => TypedFieldProps<FT>;

export type FormErrors<T: {}> = $ObjMap<ErrorFields<T>, () => string[] | void>;
