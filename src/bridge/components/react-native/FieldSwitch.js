// @flow

import * as React from 'react';
import { Switch } from 'react-native';
import type { TypedFieldProp } from '../../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<boolean>,
}>;

const FieldSwitch = ({ field, ...rest }: Props) => (
  <Switch
    value={field.value}
    onValueChange={field.handleValueChange}
    {...rest}
  />
);
export default FieldSwitch;
