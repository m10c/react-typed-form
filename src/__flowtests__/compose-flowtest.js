// @flow

import * as React from 'react';
import { withForm } from '../';

import type { FormObject } from '../';

// eslint-disable-next-line flowtype/no-weak-types
const compose: $Compose = (null: any);

const injectFoo = <Props: {}, K: React.ComponentType<Props>>(
  Component: K // eslint-disable-line no-unused-vars
): Class<
  React.Component<$Diff<React.ElementConfig<K>, { foo: string | void }>>
> => {
  // eslint-disable-next-line flowtype/no-weak-types
  return (null: any);
};

class ExampleComponent extends React.Component<{|
  bar: string,
  foo: string,
  form: FormObject<{| name?: string |}>,
|}> {}

const InjectedComponent = compose(
  injectFoo,
  withForm({ onSubmit: () => {} }),
  injectFoo
)(ExampleComponent);

<InjectedComponent bar="hello" />;

// $FlowExpectedError
<InjectedComponent />;
