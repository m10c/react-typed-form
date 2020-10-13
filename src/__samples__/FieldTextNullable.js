// @flow

import * as React from 'react';
import type { FieldProp } from '..';

type Props = $ReadOnly<{
  field: FieldProp<string | null>,
}>;

export default function FieldTextNullable({ field }: Props): React.Node {
  return (
    <input
      type="text"
      value={field.value}
      onChange={(ev) => {
        let { value } = ev.target;

        if (value.trim() === '') {
          value = null;
        }

        return field.handleValueChange(value);
      }}
    />
  );
}
