// @flow

import * as React from 'react';
import type { TypedFieldProp } from '../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<boolean>,
}>;

export default function FieldSCheckbox({ field, ...rest }: Props): React.Node {
  return (
    <input
      type="checkbox"
      checked={field.value}
      onChange={ev => field.handleValueChange(ev.target.checked)}
      {...rest}
    />
  );
}
