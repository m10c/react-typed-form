// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { FormComponent } from '..';
import { FieldCheckbox, FieldText } from '../__samples__';

import type { $Optional } from '..';

type FormShape = {|
  username?: string,
  password?: string,
|};

class LoginForm extends FormComponent<FormShape> {}

const LoginScreen = () => (
  <LoginForm
    defaultValues={{ ...null }}
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
        <FieldText field={getField('password')} />
        {/* $FlowExpectedError */}
        <FieldText field={getField('noexist')} />
        <input type="submit" onPress={handleSubmit} />
      </form>
    )}
  </LoginForm>
);
<LoginScreen />;

class DefaultsLoginForm extends FormComponent<{|
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
        <FieldText field={getField('password')} />
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

class PristineLoginForm extends FormComponent<{
  username?: string,
  password?: string,
}> {}
const PristineLoginScreen = () => (
  <PristineLoginForm
    defaultValues={{ ...null }}
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

class PristineModelLoginForm extends FormComponent<$Optional<User>> {}

const PristineModelLoginScreen = ({ user }: { user: User }) => (
  <PristineModelLoginForm
    defaultValues={{ ...null }}
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
        <FieldText field={getField('password')} />
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
