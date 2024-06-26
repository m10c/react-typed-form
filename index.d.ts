/**
 * See `src/types.js` for documented types
 */

export type ErrorFields<T> = T & { _form?: never };

export type FormErrors<T extends {}> = Readonly<{
  [P in keyof ErrorFields<T>]?: string[] | undefined;
}>;

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
  errors: FormErrors<T>;
  lastErrors: FormErrors<T>;
  hasErrors: boolean;
  hasLastErrors: boolean;
  dirtyFields: Array<keyof T>;
  hasDirty: boolean;
  validate: (options: { isSubmit: boolean }) => null | FormErrors<T>,
}>;

export type Options<T> = Readonly<{
  defaultValues: T;
  onSubmit: (
    values: T,
    form: FormObject<T>
  ) => void | boolean | Promise<void> | Promise<boolean>;
  pristineValues?: Partial<T>;
  validator?: (values: T, options: { isSubmit: boolean }) => FormErrors<T>;
  alwaysRevalidateOnChange?: boolean;
  revalidateFields?: Array<keyof T>;
  preValidateTransform?: (values: T) => T;
  postValidateTransform?: (values: T) => T;
}>;

export function useForm<T extends {}>(options: Options<T>): FormObject<T>;

/**
 * @experimental
 */
export type FormGroupItemControls = Readonly<{
  aliases: string[];
  setForm: (form: FormObject<any>) => void;
  useSetForm: (form: FormObject<any>) => void;
  remove: () => void;
  addAlias: (alias: string) => void;
}>;

/**
 * @experimental
 */
export type FormGroup = Readonly<{
  addKey: (key: string) => void;
  hasKeyOrAlias: (keyOrAlias: string) => boolean;
  keys: string[];

  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  hasLastErrors: boolean;
  submit: (options: {
    whitelistKeys?: string[];
    onFinish?: (props: { hasErrors: boolean }) => void;
  }) => Promise<boolean>;

  _getItemControls: (key: string) => FormGroupItemControls;
}>;

/**
 * @experimental
 */
export function useFormGroup(options: {
  initialKeys?: string[];
}): FormGroup;

/**
 * @experimental
 */
export function useFormGrouptem(
  formGroup: FormGroup,
  key: string,
  form?: FormObject<any>
): FormGroupItemControls;
