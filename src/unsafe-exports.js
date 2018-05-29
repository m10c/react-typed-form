// @flow
/* eslint-disable flowtype/no-weak-types */

import TypedForm from './TypedForm';
import type { TypedFieldProps, TypedFormProp } from './types';

type Value = any;
type ValuesMap = { [key: string]: Value };

export class Form extends TypedForm<ValuesMap> {}

export type FieldProps = TypedFieldProps<Value>;
export type FormProp = TypedFormProp<ValuesMap>;
