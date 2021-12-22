// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { withForm } from '..';
import { FieldText, createValidator } from '../__samples__';

import type { FormObject } from '..';

type LoginData = {|
  username?: string,
  password?: string,
|};

type Props = $ReadOnly<{|
  foo: number,
  form: FormObject<LoginData>,
|}>;

const LoginForm = ({ form: { getField, handleSubmit, isLoading } }: Props) => (
  <form>
    <FieldText field={getField('username')} />
    <FieldText field={getField('password')} />
    <input type="submit" disabled={isLoading} onPress={handleSubmit} />
  </form>
);

// $FlowExpectedError
<LoginForm foo={1} />;

const EnhancedSimple = withForm({
  defaultValues: { ...null },
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

// $FlowFixMe[incompatible-call]
const EnhancedOwnProps = withForm((ownProps) => ({
  defaultValues: { ...null },
  onSubmit: () => {
    ownProps.foo;
  },
}))(LoginForm);

<EnhancedOwnProps foo={1} />;
// $FlowExpectedError
<EnhancedOwnProps bar={1} />;

// $FlowFixMe[incompatible-call]
const EnhancedOwnPropsInvalid = withForm((ownProps) => ({
  defaultValues: { ...null },
  onSubmit: () => {
    // $FlowExpectedError
    ownProps.bar;
  },
}))(LoginForm);

<EnhancedOwnPropsInvalid foo={1} />;

// $FlowFixMe[incompatible-call]
const EnhancedValidatejs = withForm({
  defaultValues: { ...null },
  onSubmit: (values) => console.log(values),
  validator: createValidator({
    username: {
      presence: { allowEmpty: false },
      length: { minimum: 2, maximum: 12 },
    },
    password: { presence: { allowEmpty: false }, length: { minimum: 5 } },
  }),
})(LoginForm);

<EnhancedValidatejs foo={1} />;
