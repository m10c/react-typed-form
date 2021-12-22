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
export type $Optional<T> = $Rest<T, { ... }>;
// export type $Optional<T> = $Shape<$ObjMap<T, <V>(V) => V | void>>;

/**
 * Object containing fields that can contain errors (with original types)
 */
export type ErrorFields<T> = { ...T, _form?: empty, ... };

/**
 * The error map (array of strings in case of error, undefined if valid)
 */
export type FormErrors<T> = $ObjMap<ErrorFields<T>, () => string[] | void>;

/**
 * The object returned when retrieving a field, which you likely want to pass
 * dirctely into your component.
 */
export type FieldProp<FTOut, FTIn = FTOut | void> = $ReadOnly<{|
  name: string,
  label: string,
  value: FTIn,
  handleValueChange: (value: FTOut) => void,
  // These are optional to make it easier for users to manually create their
  // own code compatible with the FieldProp API.
  isDirty?: boolean,
  isLoading?: boolean,
  errorList?: string[],
  lastErrorList?: string[],
|}>;

type GetField<T> = <FK: $Keys<T>, FT: $ElementType<T, FK>>(
  field: FK
) => FieldProp<FT>;

/**
 * The object returned when creating a form
 */
export type FormObject<T> = $ReadOnly<{|
  getField: GetField<T>,
  handleSubmit: () => Promise<boolean>,
  isLoading: boolean,
  setLoading: (boolean) => void,
  addSubmitError: (field: $Keys<ErrorFields<T>>, error: string) => void,
  formErrorList: string[],
  // New for 0.2
  values: T,
  reset: () => void,
  // New for 0.3
  errors: FormErrors<T>,
  lastErrors: FormErrors<T>,
  hasErrors: boolean,
  hasLastErrors: boolean,
|}>;

/**
 * Options to pass in when creating a form
 */
export type Options<T> = $ReadOnly<{|
  // Required
  defaultValues: T,
  onSubmit: (
    values: T,
    form: FormObject<T>
  ) => void | boolean | Promise<void> | Promise<boolean>,

  // Optional
  pristineValues?: $Shape<T>, // Pristine values don't count as changes
  validator?: (values: T) => FormErrors<T>,
  alwaysRevalidateOnChange?: boolean,
  revalidateFields?: Array<$Keys<T>>,
  preValidateTransform?: (T) => T,
  postValidateTransform?: (T) => T,
|}>;
