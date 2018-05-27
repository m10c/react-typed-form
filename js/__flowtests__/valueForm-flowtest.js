// @flow

import * as React from 'react';
import { Button, View } from 'react-native';
import { valueForm } from '../';
import { TextInput as FieldTextInput } from '../bridge/components/react-native';
import { bridgeValidatejs } from '../bridge/validation/validatejs';

import type { FormProp } from '../';

type Props = $ReadOnly<{|
  foo: number,
  form: FormProp,
|}>;

export const LoginForm = ({
  form: { getFieldProps, handleSubmit, isLoading },
}: Props) => (
  <View>
    <FieldTextInput field={getFieldProps('username')} />
    <FieldTextInput field={getFieldProps('password')} secureTextEntry />
    <Button title="Submit" onPress={handleSubmit} />
  </View>
);

// $FlowExpectedError
<LoginForm foo={1} />;

const EnhancedSimple = valueForm({
  onSubmit: values => console.log(values),
})(LoginForm);

<EnhancedSimple foo={1} />;

// $FlowExpectedError
const EnhancedInvalid = valueForm({
  onSubmit: values => console.log(values),
  foo: 'bar',
})(LoginForm);

const EnhancedOwnProps = valueForm({
  onSubmit: (values, ownProps) => {
    ownProps.foo;
  },
})(LoginForm);

<EnhancedOwnProps foo={1} />;
// $FlowExpectedError
<EnhancedOwnProps bar={1} />;

const EnhancedOwnPropsInvalid = valueForm({
  onSubmit: (values, ownProps) => {
    // $FlowExpectedError
    ownProps.bar;
  },
})(LoginForm);

<EnhancedOwnPropsInvalid foo={1} />;

const EnhancedValidatejs = valueForm({
  onSubmit: values => console.log(values),
  validate: bridgeValidatejs({
    username: {
      presence: { allowEmpty: false },
      length: { minimum: 2, maximum: 12 },
    },
    password: { presence: { allowEmpty: false }, length: { minimum: 5 } },
  }),
})(LoginForm);

<EnhancedValidatejs foo={1} />;
