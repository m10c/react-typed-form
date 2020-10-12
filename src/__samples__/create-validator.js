// @flow

import type { FormErrors } from '../types';

// eslint-disable-next-line no-unused-vars
export default function createValidator<T: {}>(constraints: {}): (
  values: T
) => FormErrors<T> {
  // eslint-disable-next-line no-unused-vars
  return (values) => ({ ...null });
}
