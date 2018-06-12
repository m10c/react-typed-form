// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Button, View } from 'react-native';
import { Form } from '..';
import {
  FieldTextInput,
  FieldTextInputNullable,
} from '../bridge/components/react-native';
import { bridgeValidatejs } from '../bridge/validation/validatejs';

const LoginScreen = () => (
  <Form onSubmit={values => console.log(values)}>
    {({ getFieldProps, handleSubmit }) => (
      <View>
        <FieldTextInput field={getFieldProps('username')} />
        <FieldTextInput field={getFieldProps('password')} secureTextEntry />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    )}
  </Form>
);

<LoginScreen />;

const LoginScreenInvalid = () => (
  <Form onSubmit={values => console.log(values)}>
    {/* $FlowExpectedError */}
    {({ getFieldProps, handleSubmit, invalidProp }) => (
      <View>
        {invalidProp}
        <FieldTextInput field={getFieldProps('username')} />
        <FieldTextInput field={getFieldProps('password')} secureTextEntry />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    )}
  </Form>
);

<LoginScreenInvalid />;

class EnhancedValidatejs extends React.PureComponent<{}> {
  onSubmit = values => console.log(values);

  render() {
    return (
      <Form
        validate={bridgeValidatejs({
          username: {
            presence: { allowEmpty: false },
            length: { minimum: 2, maximum: 12 },
          },
          password: { presence: { allowEmpty: false }, length: { minimum: 5 } },
        })}
        onSubmit={this.onSubmit}
      >
        {({ getFieldProps, handleSubmit }) => (
          <View>
            <FieldTextInput field={getFieldProps('username')} />
            {/* $FlowExpectedError */}
            <FieldTextInput field={getFieldProps('password')} secureTextEntry />
            <FieldTextInputNullable
              field={getFieldProps('password')}
              secureTextEntry
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Form>
    );
  }
}

<EnhancedValidatejs />;
