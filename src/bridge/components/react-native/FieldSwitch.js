// @flow

import * as React from 'react';
import { Switch } from 'react-native';
import type { TypedFieldProps } from '../../..';

type Props = $ReadOnly<{
  field: TypedFieldProps<boolean>,
}>;

const FieldSwitch = ({ field, ...rest }: Props) => (
  <Switch
    value={field.value}
    onValueChange={field.handleValueChange}
    {...rest}
  />
);
export default FieldSwitch;
