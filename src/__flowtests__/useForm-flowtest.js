// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { useForm } from '..';
import { FieldCheckbox, FieldText } from '../__samples__';

import type { $Optional } from '..';

type Shape = {|
  username?: string,
  password?: string,
|};

function Screen() {
  const { getField, handleSubmit } = useForm<Shape>({
    onSubmit: (values) => {
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
    <form>
      <FieldText field={getField('username')} />
      <FieldText field={getField('password')} secureTextEntry />
      {/* $FlowExpectedError */}
      <FieldText field={getField('noexist')} />
      <input type="submit" onPress={handleSubmit} />
    </form>
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
    onSubmit: (values) => {
      (values.username: string);
      // $FlowExpectedError
      (values.password: string);
    },
  });
  return (
    <form>
      <FieldText field={getField('username')} />
      <FieldText field={getField('password')} secureTextEntry />
      <input type="submit" onPress={handleSubmit} />
    </form>
  );
}
<DefaultsScreen />;

function DefaultsBrokenUndefScreen() {
  // $FlowExpectedError[prop-missing]
  useForm<DefaultsShape>({
    defaultValues: { username: 'anon', __password: 'foo' },
    onSubmit: (values) => console.log(values),
  });
  return <form />;
}
<DefaultsBrokenUndefScreen />;

function DefaultsBrokenMissingScreen() {
  useForm<DefaultsShape>({
    // $FlowExpectedError
    defaultValues: { password: 'foo' },
    onSubmit: (values) => console.log(values),
  });
  return <form />;
}
<DefaultsBrokenMissingScreen />;

type PristineShape = {
  username?: string,
  password?: string,
};

function PristineScreen() {
  useForm<PristineShape>({
    pristineValues: { username: 'anon' },
    onSubmit: (values) => console.log(values),
  });
  return <form />;
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
    onSubmit: (values) => console.log(values),
  });
  return (
    <form>
      <FieldText field={getField('username')} />
      <FieldText field={getField('password')} secureTextEntry />
      <FieldCheckbox field={getField('enabled')} />
    </form>
  );
}
<PristineModelScreen
  user={{ username: 'James', password: null, dob: null, enabled: true }}
/>;

function PristineBrokenScreen() {
  // $FlowExpectedError[prop-missing]
  useForm<$Optional<User>>({
    // $FlowExpectedError[incompatible-call]
    pristineValues: { username: 2, other: 'yes' },
    onSubmit: (values) => console.log(values),
  });
  return <form />;
}
<PristineBrokenScreen />;
