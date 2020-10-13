// @flow

import * as React from 'react';
import type { FieldProp } from '..';

type Props = $ReadOnly<{
  field: FieldProp<boolean>,
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
