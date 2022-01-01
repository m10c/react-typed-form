# react-typed-form

[![npm version](https://img.shields.io/npm/v/react-typed-form.svg)](https://www.npmjs.com/package/react-typed-form)
[![Circle CI Status](https://circleci.com/gh/m10c/react-typed-form.svg?style=shield)](https://circleci.com/gh/m10c/react-typed-form)
[![license](https://img.shields.io/github/license/m10c/react-typed-form.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/react-typed-form.svg)](https://www.npmjs.com/package/react-typed-form)

> A simple, flexible and type-safe form state management library for React.

- Multiple APIs: **Hooks** (recommended), **Render Props** and **HOC**.
- Uses React's _local state_ to hold form state, so as not to clutter up global state (e.g. Redux).
- Type-safe submitted form data with **Flow** and **TypeScript**.
- Works well with React DOM, React Native, and any other React flavour.
- Compose multiple forms together with Form Groups.
- Many useful features including validation, error messages, loading/disabled state, and more.

## Setup

```bash
$ npm install --save react-typed-form

# Or, with yarn
$ yarn add react-typed-form
```

## Usage

### Minimal example: Hooks / React Native

Usage can be extremely minimal.
In this example, all you're really doing is bringing your form state and submission logic into one place.
However, this opens the door to adding in more advanced features with single lines of code.

```js
import * as React from 'react';
import { Button, View } from 'react-native';
import { useForm } from 'react-typed-form';

export default function MyPage() {
  const { getField, handleSubmit } = useForm({
    defaultValues: {}
    onSubmit: (values) => {
      // Do something with your values
      console.log(values);
    },
  });

  return (
    <View>
      <input
        value={getField('name').value || ''}
        onChange={(ev) => getField('name').handleValueChange(ev.target.value)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
```

### Feature-rich example: Hooks / React DOM

The example below brings into play many more features of the library:

- Validation and error messages (utilitiing the `validate.js` library, but using other libraries or custom implementations is easy).
- Pristine and default values (default values come through in the submitted values, while pristine values don't).
- Loading state management (fields become uneditable while save is in progress).
- Type-safe submission shape.
- A custom field component which receives the `field` prop.
- Automatic label generation and usage of field name.

```js
// @flow

import * as React from 'react';
import { useForm } from 'react-typed-form';
import type { FieldProp } from 'react-typed-form';

type Props = $ReadOnly<{|
  field: FieldProp<string | null>,
|}>;

function FieldText({ field }: Props) {
  const errors = field.lastErrorList;
  return (
    <div>
      <label for={field.name}>{field.label}</label>
      <input
        name={field.name}
        value={field.value || ''}
        onChange={(ev) => field.handleValueChange(ev.target.value)}
        disabled={field.isLoading}
      />
      {errors && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

type FormShape = {|
  name: string,
  bio?: string | null,
  phone?: string | null,
  country: string,
|};

export default function MyPage() {
  const form = useForm<FormShape>({
    // Any non-optional typed values must have defaults provided
    defaultValues: { name: '', country: 'United Kingdom' },
    // Pristine values can give useful pre-filled values which don't get
    // submitted.
    pristineValues: { phone: '+44' },
    validate: bridgeValidatejs({
      name: {
        presence: { allowEmpty: false }, // Forbid empty string
        length: { minimum: 2, maximum: 40 },
      },
    }),
    // onSubmit will only be reached if the validation returns no errors
    onSubmit: async (values, { addError, setLoading }) => {
      setLoading(true);
      try {
        await fetch('/create-user', {
          method: 'POST',
          body: JSON.stringify(values),
        });
        window.location = '/success';
      } catch (err) {
        setLoading(false);
        // You could iterate over field errors reported by the server and set
        // specific per-field errors here, but we'll just add an error to the
        // whole form
        setError('_form', 'Something went wrong');
      }
    },
  });

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        form.handleSubmit();
      }}
    >
      <FormErrorList errors={form.formErrorList} />

      {/* If you're going down the type-safe route, you'll need separate fields
          for nullable vs non-nullable values */}
      <FieldTextRequired field={form.getField('name')} />

      {/* Override the auto-generated label */}
      <FieldText field={{ ...form.getField('bio'), label: 'About you' }} />

      <FieldText field={form.getField('phone')} />

      {/* Create custom fields for any behaviour or types of values... */}
      <FieldSelect choices={COUNTRIES} field={form.getField('country')} />

      <button type="submit" disabled={form.isLoading}>
        Submit
      </button>
    </form>
  );
}
```
