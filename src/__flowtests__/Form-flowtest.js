// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { Form } from '..';
import {
  FieldText,
  FieldTextNullable,
  createValidator,
} from '../__tests__/samples';

const LoginScreen = () => (
  <Form onSubmit={values => console.log(values)}>
    {({ getField, handleSubmit }) => (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        <FieldText field={getField('username')} />
        <FieldText field={getField('password')} secureTextEntry />
        <input type="submit" onPress={handleSubmit} />
      </form>
    )}
  </Form>
);

<LoginScreen />;

const LoginScreenInvalid = () => (
  <Form onSubmit={values => console.log(values)}>
    {/* $FlowExpectedError */}
    {({ getField, handleSubmit, invalidProp }) => (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          handleSubmit();
        }}
      >
        {invalidProp}
        <FieldText field={getField('username')} />
        <FieldText field={getField('password')} secureTextEntry />
        <input type="Submit" onPress={handleSubmit} />
      </form>
    )}
  </Form>
);

<LoginScreenInvalid />;

class EnhancedValidatejs extends React.PureComponent<{}> {
  onSubmit = values => console.log(values);

  render() {
    return (
      <Form
        validate={createValidator({
          username: {
            presence: { allowEmpty: false },
            length: { minimum: 2, maximum: 12 },
          },
          password: { presence: { allowEmpty: false }, length: { minimum: 5 } },
        })}
        onSubmit={this.onSubmit}
      >
        {({ getField, handleSubmit }) => (
          <form
            onSubmit={ev => {
              ev.preventDefault();
              handleSubmit();
            }}
          >
            <FieldText field={getField('username')} />
            <FieldText field={getField('password')} secureTextEntry />
            <FieldTextNullable field={getField('password')} secureTextEntry />
            <input type="submit" onPress={handleSubmit} />
          </form>
        )}
      </Form>
    );
  }
}

// Caused babel error when not in function for some reason
() => {
  <EnhancedValidatejs />;
};
