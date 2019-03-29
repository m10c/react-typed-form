// @flow

import * as React from 'react';
import { TextInput } from 'react-native';
import type { TypedFieldProp } from '../../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<string>,
  /* $ReadOnly<{
    handleValueChange: (value: string) => void,
  }>, */
}>;

const FieldTextInput = ({ field, ...rest }: Props) => (
  <TextInput
    defaultValue={field.value}
    onChangeText={field.handleValueChange}
    {...rest}
  />
);
export default FieldTextInput;
