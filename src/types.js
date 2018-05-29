// @flow

export type $Optional<T: {}> = $Shape<$ObjMap<T, <V>(V) => V | void>>;

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
|}>;

export type TypedFieldProps<FT> = $ReadOnly<{|
  name: string,
  label: string,
  value: FT,
  handleValueChange: (value: FT) => void,
  isLoading?: boolean,
  lastErrors?: string[],
  isValid?: boolean,
|}>;

type GetFieldProps<T, FK: $Keys<T>, FT: $ElementType<T, FK>> = (
  field: FK
) => TypedFieldProps<FT>;

export type FormErrors<T: {}> = $ObjMap<T, () => string[] | void>;
