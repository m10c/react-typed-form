// @flow

import * as React from 'react';
import useForm from './use-form';

import type { Options, FormObject } from './types';

type Props<T> = $ReadOnly<{|
  ...Options<T>,
  children: (FormObject<T>) => React.Node,
|}>;

function WithHooks<T: { ... }>({ children, ...options }: Props<T>) {
  const form = useForm<T>(options);
  return children(form);
}

export default class FormComponent<T: { ... }> extends React.PureComponent<
  Props<T>
> {
  render(): React.Node {
    return <WithHooks {...this.props} />;
  }
}
