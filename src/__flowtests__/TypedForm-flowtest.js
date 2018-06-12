// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Button, View } from 'react-native';
import { TypedForm } from '..';
import { FieldSwitch, FieldTextInput } from '../bridge/components/react-native';

import type { $Optional } from '..';

class LoginForm extends TypedForm<{|
  username?: string,
  password?: string,
|}> {}

const LoginScreen = () => (
  <LoginForm
    onSubmit={values => {
      (values.username: ?string);
      // $FlowExpectedError
      (values.username: string);
      // $FlowExpectedError
      (values.username: ?number);
      // $FlowExpectedError
      (values.noexist: string);
    }}
  >
    {({ getFieldProps, handleSubmit }) => (
      <View>
        <FieldTextInput field={getFieldProps('username')} />
        <FieldTextInput field={getFieldProps('password')} secureTextEntry />
        {/* $FlowExpectedError */}
        <FieldTextInput field={getFieldProps('noexist')} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
    onSubmit={values => {
      (values.username: string);
      // $FlowExpectedError
      (values.password: string);
    }}
  >
    {({ getFieldProps, handleSubmit }) => (
      <View>
        <FieldTextInput field={getFieldProps('username')} />
        <FieldTextInput field={getFieldProps('password')} secureTextEntry />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    )}
  </DefaultsLoginForm>
);
<DefaultsLoginScreen />;

const DefaultsBrokenLoginScreen = () => (
  <DefaultsLoginForm
    // $FlowExpectedError
    defaultValues={{ __username: 'anon' }}
    onSubmit={values => console.log(values)}
  >
    {() => <View />}
  </DefaultsLoginForm>
);
<DefaultsBrokenLoginScreen />;

class PristineLoginForm extends TypedForm<{
  username?: string,
  password?: string,
}> {}
const PristineLoginScreen = () => (
  <PristineLoginForm
    pristineValues={{ username: 'anon' }}
    onSubmit={values => console.log(values)}
  >
    {() => <View />}
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
    onSubmit={values => console.log(values)}
  >
    {({ getFieldProps }) => (
      <View>
        <FieldTextInput field={getFieldProps('username')} />
        <FieldTextInput field={getFieldProps('password')} secureTextEntry />
        <FieldSwitch field={getFieldProps('enabled')} />
      </View>
    )}
  </PristineModelLoginForm>
);
<PristineModelLoginScreen
  user={{ username: 'James', password: null, dob: null, enabled: true }}
/>;

const PristineBrokenLoginScreen = () => (
  <PristineLoginForm
    // $FlowExpectedError
    pristineValues={{ username: 2, other: 'yes' }}
    onSubmit={values => console.log(values)}
  >
    {() => <View />}
  </PristineLoginForm>
);
<PristineBrokenLoginScreen />;
