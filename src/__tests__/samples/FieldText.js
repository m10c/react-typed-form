// @flow

import * as React from 'react';
import type { TypedFieldProp } from '../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<string>,
}>;

export default function FieldText({ field, ...rest }: Props): React.Node {
  return (
    <input
      type="text"
      value={field.value}
      onChange={ev => field.handleValueChange(ev.target.value)}
      {...rest}
    />
  );
}
