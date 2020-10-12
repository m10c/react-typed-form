// @flow

import * as React from 'react';
import type { TypedFieldProp } from '..';

type Props = $ReadOnly<{
  field: TypedFieldProp<boolean>,
}>;

export default function FieldCheckbox({ field }: Props): React.Node {
  return (
    <input
      type="checkbox"
      checked={field.value}
      onChange={(ev) => field.handleValueChange(ev.target.checked)}
    />
  );
}
