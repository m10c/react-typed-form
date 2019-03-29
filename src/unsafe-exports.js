// @flow
/* eslint-disable flowtype/no-weak-types */

import TypedForm from './TypedForm';
import type { TypedFieldProp, TypedFormProp } from './types';

type Value = any;
type ValuesMap = { [key: string]: Value };

export class Form extends TypedForm<ValuesMap> {}

export type FieldProp = TypedFieldProp<Value>;
export type FormProp = TypedFormProp<ValuesMap>;
