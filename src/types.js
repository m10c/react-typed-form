/**
 * T represents the guaranteed object shape your form is providing on
 * successful submission.  Similar to React props/state, you are typing for the
 * ideal end state, after defaults etc have been incorporated.
 *
 * If a user has filled out the form with data that won't match the types, the
 * localised validation errors can stop things going any further.  It would be
 * good if these validations could be tied into the form components themselves.
 *
 * @flow
 */

/* eslint-disable flowtype/generic-spacing */

/**
 * Helper for applying to a model which we're building a form around.
 *
 * Similar to $Shape<>, but also allows any field to be `void`, even if the key
 * is provided.
 */
export type $Optional<T: {}> = $Shape<$ObjMap<T, <V>(V) => V | void>>;

/**
 * Object containing fields that can contain errors (with original types)
 */
export type ErrorFields<T> = { ...T, _form?: empty };

/**
 * The error map (array of strings in case of error, undefined if valid)
 */
export type FormErrors<T: {}> = $ObjMap<ErrorFields<T>, () => string[] | void>;

/**
 * The object returned when retrieving a field, which you likely want to pass
 * dirctely into your component.
 */
export type TypedFieldProp<FTOut, FTIn = FTOut | void> = $ReadOnly<{|
  name: string,
  label: string,
  value: FTIn,
  handleValueChange: (value: FTOut) => void,
  isLoading?: boolean,
  lastErrorList?: string[],
  isValid?: boolean,
|}>;

type GetField<T> = <FK: $Keys<T>, FT: $ElementType<T, FK>>(
  field: FK
) => TypedFieldProp<FT>;

/**
 * The object returned when creating a form
 */
export type TypedFormProp<T> = $ReadOnly<{|
  getField: GetField<T>,
  handleSubmit: () => Promise<boolean>,
  isLoading: boolean,
  setLoading: boolean => void,
  addError: (field: $Keys<ErrorFields<T>>, error: string) => void,
  formErrorList: string[],
  // New for 0.2
  values: T,
  reset: () => void,
|}>;

/**
 * Options to pass in when creating a form
 */
export type Options<T> = $ReadOnly<{|
  // Required
  onSubmit: (values: T, form: TypedFormProp<T>) => void | Promise<void>,

  // Optional
  defaultValues?: T,
  pristineValues?: $Shape<T>, // Pristine values don't count as changes
  validate?: (values: T) => FormErrors<T>,
  validateOnChange?: boolean,
|}>;
