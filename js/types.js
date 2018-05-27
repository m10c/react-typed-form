// @flow

export type FieldProps = $ReadOnly<{|
  name: string,
  label: string,
  value: mixed,
  handleValueChange: (value: mixed) => void,
  isLoading?: boolean,
  lastErrors?: string[],
  isValid?: boolean,
|}>;

export type GetFieldProps = (field: string) => FieldProps;

export type FormErrors = { [key: string]: void | string[] };

export type FormProp = $ReadOnly<{|
  getFieldProps: GetFieldProps,
  handleSubmit: () => void,
  isLoading: boolean,
|}>;

// eslint-disable-next-line flowtype/no-weak-types
export type ValuesMap = { [key: string]: any };
