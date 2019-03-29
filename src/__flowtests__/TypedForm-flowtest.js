// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Button, View } from 'react-native';
import { TypedForm } from '..';
import { FieldSwitch, FieldTextInput } from '../bridge/components/react-native';

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
      <View>
        <FieldTextInput field={getField('username')} />
        <FieldTextInput field={getField('password')} secureTextEntry />
        {/* $FlowExpectedError */}
        <FieldTextInput field={getField('noexist')} />
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
    {({ getField, handleSubmit }) => (
      <View>
        <FieldTextInput field={getField('username')} />
        <FieldTextInput field={getField('password')} secureTextEntry />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    )}
  </DefaultsLoginForm>
);
<DefaultsLoginScreen />;

const DefaultsBrokenUndefLoginScreen = () => (
  <DefaultsLoginForm
    // $FlowExpectedError
    defaultValues={{ username: 'anon', __password: 'foo' }}
    onSubmit={values => console.log(values)}
  >
    {() => <View />}
  </DefaultsLoginForm>
);
<DefaultsBrokenUndefLoginScreen />;

const DefaultsBrokenMissingLoginScreen = () => (
  <DefaultsLoginForm
    // $FlowExpectedError
    defaultValues={{ password: 'foo' }}
    onSubmit={values => console.log(values)}
  >
    {() => <View />}
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
    {({ getField }) => (
      <View>
        <FieldTextInput field={getField('username')} />
        <FieldTextInput field={getField('password')} secureTextEntry />
        <FieldSwitch field={getField('enabled')} />
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
