// @flow
/* eslint-disable no-console */

import * as React from 'react';
import { UntypedFormComponent } from '..';
import { FieldText, FieldTextNullable, createValidator } from '../__samples__';

const LoginScreen = () => (
  <UntypedFormComponent
    defaultValues={{}}
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
        <input type="submit" onPress={handleSubmit} />
      </form>
    )}
  </UntypedFormComponent>
);

<LoginScreen />;

const LoginScreenInvalid = () => (
  <UntypedFormComponent
    defaultValues={{}}
    onSubmit={(values) => console.log(values)}
  >
    {/* $FlowExpectedError */}
    {({ getField, handleSubmit, invalidProp }) => (
      <form
        onSubmit={(ev) => {
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
  </UntypedFormComponent>
);

<LoginScreenInvalid />;

class EnhancedValidatejs extends React.PureComponent<{}> {
  onSubmit = (values) => console.log(values);

  render() {
    return (
      <UntypedFormComponent
        defaultValues={{}}
        validator={createValidator({
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
            onSubmit={(ev) => {
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
      </UntypedFormComponent>
    );
  }
}

// Caused babel error when not in function for some reason
() => {
  <EnhancedValidatejs />;
};
