// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Button, View } from 'react-native';
import { withForm } from '../';
import { FieldTextInput } from '../bridge/components/react-native';
import { bridgeValidatejs } from '../bridge/validation/validatejs';

import type { TypedFormProp } from '../';

type LoginData = {|
  username?: string,
  password?: string,
|};

type Props = $ReadOnly<{|
  foo: number,
  form: TypedFormProp<LoginData>,
|}>;

const LoginForm = ({
  form: { getFieldProps, handleSubmit, isLoading },
}: Props) => (
  <View>
    <FieldTextInput field={getFieldProps('username')} />
    <FieldTextInput field={getFieldProps('password')} secureTextEntry />
    <Button title="Submit" disabled={isLoading} onPress={handleSubmit} />
  </View>
);

// $FlowExpectedError
<LoginForm foo={1} />;

const EnhancedSimple = withForm({
  onSubmit: (values: LoginData) => {
    console.log(values.username);
    // $FlowExpectedError
    console.log(values.invalid);
  },
})(LoginForm);

<EnhancedSimple foo={1} />;

// $FlowExpectedError
const EnhancedInvalid = withForm({
  onSubmit: values => console.log(values),
  foo: 'bar',
})(LoginForm);

<EnhancedInvalid foo={1} />;

const EnhancedOwnProps = withForm(ownProps => ({
  onSubmit: () => {
    ownProps.foo;
  },
}))(LoginForm);

<EnhancedOwnProps foo={1} />;
// $FlowExpectedError
<EnhancedOwnProps bar={1} />;

const EnhancedOwnPropsInvalid = withForm(ownProps => ({
  onSubmit: () => {
    // $FlowExpectedError
    ownProps.bar;
  },
}))(LoginForm);

<EnhancedOwnPropsInvalid foo={1} />;

const EnhancedValidatejs = withForm({
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
