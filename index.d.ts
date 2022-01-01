/**
 * See `src/types.js` for documented types
 */

export type ErrorFields<T> = T & { _form?: never };

export type FormErrors<T extends {}> = Readonly<
  { [P in keyof T]?: string[] | undefined }
>;

export type FieldProp<FTOut, FTIn = FTOut | undefined> = Readonly<{
  name: string;
  label: string;
  value: FTIn;
  handleValueChange: (value: FTOut) => void;
  isDirty?: boolean;
  isLoading?: boolean;
  errorList?: string[];
  lastErrorList?: string[];
}>;

export type FormObject<T> = Readonly<{
  getField: <K extends keyof T>(field: K) => FieldProp<T[K]>;
  handleSubmit: () => Promise<boolean>;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addSubmitError: (field: keyof ErrorFields<T>, error: string) => void;
  formErrorList: string[];
  values: T;
  reset: () => void;
  errors: FormErrors<ErrorFields<T>>;
  lastErrors: FormErrors<ErrorFields<T>>;
  hasErrors: boolean;
  hasLastErrors: boolean;
}>;

export type Options<T> = Readonly<{
  defaultValues: T;
  onSubmit: (
    values: TOut,
    form: FormObject<T>
  ) => void | boolean | Promise<void> | Promise<boolean>;
  pristineValues?: Partial<T>;
  validator?: (values: T) => FormErrors<T>;
  alwaysRevalidateOnChange?: boolean;
  revalidateFields?: Array<keyof T>;
  preValidateTransform?: (values: T) => T;
  postValidateTransform?: (values: T) => T;
}>;

export function useForm<T extends {}>(options: Options<T>): FormObject<T>;
