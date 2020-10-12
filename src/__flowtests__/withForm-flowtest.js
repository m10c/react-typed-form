// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { withForm } from '..';
import { FieldText, createValidator } from '../__samples__';

import type { TypedFormProp } from '..';

type LoginData = {|
  username?: string,
  password?: string,
|};

type Props = $ReadOnly<{|
  foo: number,
  form: TypedFormProp<LoginData>,
|}>;

const LoginForm = ({ form: { getField, handleSubmit, isLoading } }: Props) => (
  <form>
    <FieldText field={getField('username')} />
    <FieldText field={getField('password')} secureTextEntry />
    <input type="submit" disabled={isLoading} onPress={handleSubmit} />
  </form>
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
  onSubmit: (values) => console.log(values),
  foo: 'bar',
})(LoginForm);

<EnhancedInvalid foo={1} />;

const EnhancedOwnProps = withForm((ownProps) => ({
  onSubmit: () => {
    ownProps.foo;
  },
}))(LoginForm);

<EnhancedOwnProps foo={1} />;
// $FlowExpectedError
<EnhancedOwnProps bar={1} />;

const EnhancedOwnPropsInvalid = withForm((ownProps) => ({
  onSubmit: () => {
    // $FlowExpectedError
    ownProps.bar;
  },
}))(LoginForm);

<EnhancedOwnPropsInvalid foo={1} />;

const EnhancedValidatejs = withForm({
  onSubmit: (values) => console.log(values),
  validate: createValidator({
    username: {
      presence: { allowEmpty: false },
      length: { minimum: 2, maximum: 12 },
    },
    password: { presence: { allowEmpty: false }, length: { minimum: 5 } },
  }),
})(LoginForm);

<EnhancedValidatejs foo={1} />;
