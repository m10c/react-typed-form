// @flow

import * as React from 'react';
import { TextInput } from 'react-native';
import type { TypedFieldProp } from '../../..';

type Props = $ReadOnly<{
  field: TypedFieldProp<string | null>,
}>;

const FieldTextInput = ({ field, ...rest }: Props) => (
  <TextInput
    defaultValue={field.value || ''}
    onChangeText={(original: string) => {
      let value = original;

      if (value.trim() === '') {
        value = null;
      }

      return field.handleValueChange(value);
    }}
    {...rest}
  />
);
export default FieldTextInput;
