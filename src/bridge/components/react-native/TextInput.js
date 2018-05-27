// @flow

import * as React from 'react';
import { TextInput } from 'react-native';

import type { FieldProps } from '../../../types';

type Props = $ReadOnly<{
  field: FieldProps,
}>;

const FieldTextInput = ({ field, ...rest }: Props) => (
  <TextInput onChangeText={field.handleValueChange} {...rest} />
);
export default FieldTextInput;
