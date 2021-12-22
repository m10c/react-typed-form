// @flow

import * as React from 'react';
import type { FieldProp } from '..';

type Props = $ReadOnly<{|
  field: FieldProp<string>,
|}>;

export default function FieldText({ field }: Props): React.Node {
  return (
    <input
      type="text"
      value={field.value}
      onChange={(ev) => field.handleValueChange(ev.target.value)}
    />
  );
}
