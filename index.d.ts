/**
 * See `src/types.js` for documented types
 */

import * as React from 'react';

export type ErrorFields<T> = T & { _form?: never };

export type FormErrors<T extends {}> = Readonly<
  { [P in keyof T]: string[] | undefined }
>;

export type TypedFieldProp<FTOut, FTIn = FTOut | undefined> = Readonly<{
  name: string;
  label: string;
  value: FTIn;
  handleValueChange: (value: FTOut) => void;
  isLoading?: boolean;
  lastErrorList?: string[];
  isValid?: boolean;
}>;

export type TypedFormProp<T> = Readonly<{
  getField: <K extends keyof T>(field: K) => TypedFieldProp<T[K]>;
  handleSubmit: () => Promise<boolean>;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addError: (field: keyof ErrorFields<T>, error: string) => void;
  formErrorList: string[];
  values: T;
  reset: () => void;
}>;

export type Options<T> = Readonly<{
  onSubmit: (values: T, form: TypedFormProp<T>) => void | Promise<void>;
  defaultValues?: T;
  pristineValues?: Partial<T>;
  validate?: (values: T) => FormErrors<T>;
  validateOnChange?: boolean;
}>;

export function useForm<T extends {}>(options: Options<T>): TypedFormProp<T>;
