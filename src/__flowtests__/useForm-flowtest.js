// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Button, View } from 'react-native';
import { useForm } from '..';
import { FieldSwitch, FieldTextInput } from '../bridge/components/react-native';

import type { $Optional } from '..';

type Shape = {|
  username?: string,
  password?: string,
|};

function Screen() {
  const { getField, handleSubmit } = useForm<Shape>({
    onSubmit: values => {
      (values.username: ?string);
      // $FlowExpectedError
      (values.username: string);
      // $FlowExpectedError
      (values.username: ?number);
      // $FlowExpectedError
      (values.noexist: string);
    },
  });
  return (
    <View>
      <FieldTextInput field={getField('username')} />
      <FieldTextInput field={getField('password')} secureTextEntry />
      {/* $FlowExpectedError */}
      <FieldTextInput field={getField('noexist')} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
<Screen />;

type DefaultsShape = {|
  username: string,
  password?: string,
|};

function DefaultsScreen() {
  const { getField, handleSubmit } = useForm<DefaultsShape>({
    defaultValues: { username: 'anon' },
    onSubmit: values => {
      (values.username: string);
      // $FlowExpectedError
      (values.password: string);
    },
  });
  return (
    <View>
      <FieldTextInput field={getField('username')} />
      <FieldTextInput field={getField('password')} secureTextEntry />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
<DefaultsScreen />;

function DefaultsBrokenUndefScreen() {
  useForm<DefaultsShape>({
    // $FlowExpectedError
    defaultValues: { username: 'anon', __password: 'foo' },
    onSubmit: values => console.log(values),
  });
  return <View />;
}
<DefaultsBrokenUndefScreen />;

function DefaultsBrokenMissingScreen() {
  useForm<DefaultsShape>({
    // $FlowExpectedError
    defaultValues: { password: 'foo' },
    onSubmit: values => console.log(values),
  });
  return <View />;
}
<DefaultsBrokenMissingScreen />;

type PristineShape = {
  username?: string,
  password?: string,
};

function PristineScreen() {
  useForm<PristineShape>({
    pristineValues: { username: 'anon' },
    onSubmit: values => console.log(values),
  });
  return <View />;
}
<PristineScreen />;

type User = {
  username: string,
  password: string | null,
  dob: string | null,
  enabled: boolean,
};

function PristineModelScreen({ user }: { user: User }) {
  const { getField } = useForm<$Optional<User>>({
    pristineValues: user,
    onSubmit: values => console.log(values),
  });
  return (
    <View>
      <FieldTextInput field={getField('username')} />
      <FieldTextInput field={getField('password')} secureTextEntry />
      <FieldSwitch field={getField('enabled')} />
    </View>
  );
}
<PristineModelScreen
  user={{ username: 'James', password: null, dob: null, enabled: true }}
/>;

function PristineBrokenScreen() {
  useForm<$Optional<User>>({
    // $FlowExpectedError
    pristineValues: { username: 2, other: 'yes' },
    onSubmit: values => console.log(values),
  });
  return <View />;
}
<PristineBrokenScreen />;
