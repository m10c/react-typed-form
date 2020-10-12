// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { TypedForm } from '..';
import { FieldCheckbox, FieldText } from '../__samples__';

import type { $Optional } from '..';

type FormShape = {|
  username?: string,
  password?: string,
|};

class LoginForm extends TypedForm<FormShape> {}

const LoginScreen = () => (
  <LoginForm
    onSubmit={(values: FormShape) => {
      (values.username: ?string);
      // $FlowExpectedError
      (values.username: string);
      // $FlowExpectedError
      (values.username: ?number);
      // $FlowExpectedError
      (values.noexist: string);
    }}
  >
    {({ getField, handleSubmit }) => (
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <FieldText field={getField('username')} />
        <FieldText field={getField('password')} secureTextEntry />
        {/* $FlowExpectedError */}
        <FieldText field={getField('noexist')} />
        <input type="submit" onPress={handleSubmit} />
      </form>
    )}
  </LoginForm>
);
<LoginScreen />;

class DefaultsLoginForm extends TypedForm<{|
  username: string,
  password?: string,
|}> {}

const DefaultsLoginScreen = () => (
  <DefaultsLoginForm
    defaultValues={{
      username: 'anon',
    }}
    onSubmit={(values) => {
      (values.username: string);
      // $FlowExpectedError
      (values.password: string);
    }}
  >
    {({ getField, handleSubmit }) => (
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <FieldText field={getField('username')} />
        <FieldText field={getField('password')} secureTextEntry />
        <input type="submit" onPress={handleSubmit} />
      </form>
    )}
  </DefaultsLoginForm>
);
<DefaultsLoginScreen />;

const DefaultsBrokenUndefLoginScreen = () => (
  // $FlowExpectedError[prop-missing]
  <DefaultsLoginForm
    defaultValues={{ username: 'anon', __password: 'foo' }}
    onSubmit={(values) => console.log(values)}
  >
    {() => <form />}
  </DefaultsLoginForm>
);
<DefaultsBrokenUndefLoginScreen />;

const DefaultsBrokenMissingLoginScreen = () => (
  <DefaultsLoginForm
    // $FlowExpectedError
    defaultValues={{ password: 'foo' }}
    onSubmit={(values) => console.log(values)}
  >
    {() => <form />}
  </DefaultsLoginForm>
);
<DefaultsBrokenMissingLoginScreen />;

class PristineLoginForm extends TypedForm<{
  username?: string,
  password?: string,
}> {}
const PristineLoginScreen = () => (
  <PristineLoginForm
    pristineValues={{ username: 'anon' }}
    onSubmit={(values) => console.log(values)}
  >
    {() => <form />}
  </PristineLoginForm>
);
<PristineLoginScreen />;

type User = {
  username: string,
  password: string | null,
  dob: string | null,
  enabled: boolean,
};

class PristineModelLoginForm extends TypedForm<$Optional<User>> {}

const PristineModelLoginScreen = ({ user }: { user: User }) => (
  <PristineModelLoginForm
    pristineValues={user}
    onSubmit={(values) => console.log(values)}
  >
    {({ getField, handleSubmit }) => (
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <FieldText field={getField('username')} />
        <FieldText field={getField('password')} secureTextEntry />
        <FieldCheckbox field={getField('enabled')} />
      </form>
    )}
  </PristineModelLoginForm>
);
<PristineModelLoginScreen
  user={{ username: 'James', password: null, dob: null, enabled: true }}
/>;

const PristineBrokenLoginScreen = () => (
  // $FlowExpectedError[prop-missing]
  <PristineLoginForm
    // $FlowExpectedError[incompatible-type]
    pristineValues={{ username: 2, other: 'yes' }}
    onSubmit={(values) => console.log(values)}
  >
    {() => <form />}
  </PristineLoginForm>
);
<PristineBrokenLoginScreen />;
