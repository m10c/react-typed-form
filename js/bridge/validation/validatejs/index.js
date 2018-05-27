// @flow

import validate from 'validate.js';
import type { FormErrors, ValuesMap } from '../../../types';

export function bridgeValidatejs(constraints: {}): (
  values: ValuesMap
) => FormErrors {
  return values => validate(values, constraints) || {};
}
