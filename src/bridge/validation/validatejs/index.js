// @flow

import validate from 'validate.js';
import type { FormErrors } from '../../../types';

export function bridgeValidatejs<T: {}>(constraints: {}): (
  values: T
) => FormErrors<T> {
  return values => validate(values, constraints) || {};
}
