// @flow
/* eslint-disable flowtype/no-weak-types */

import FormComponent from './FormComponent';
import type { FieldProp, FormObject } from './types';

type Value = any;
type ValuesMap = { [key: string]: Value };

export class UntypedFormComponent extends FormComponent<ValuesMap> {}

export type UntypedField = FieldProp<Value>;
export type UntypedFormObject = FormObject<ValuesMap>;
