// @flow

import * as React from 'react';
import type { TypedFieldProp } from '../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<string | null>,
}>;

export default function FieldTextNullable({
  field,
  ...rest
}: Props): React.Node {
  return (
    <input
      type="text"
      value={field.value}
      onChange={ev => {
        let { value } = ev.target;

        if (value.trim() === '') {
          value = null;
        }

        return field.handleValueChange(value);
      }}
      {...rest}
    />
  );
}
