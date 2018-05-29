// @flow

import * as React from 'react';
import { TextInput } from 'react-native';

type Props = $ReadOnly<{
  field: $ReadOnly<{
    handleValueChange: (value: string) => void,
  }>,
}>;

const FieldTextInput = ({ field, ...rest }: Props) => (
  <TextInput onChangeText={field.handleValueChange} {...rest} />
);
export default FieldTextInput;
