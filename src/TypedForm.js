// @flow

import * as React from 'react';
import useForm from './use-form';

import type { Options, TypedFormProp } from './types';

type Props<T> = $ReadOnly<{|
  ...Options<T>,
  children: (TypedFormProp<T>) => React.Node,
|}>;

function WithHooks<T: {}>({ children, ...options }: Props<T>) {
  const form = useForm<T>(options);
  return children(form);
}

export default class TypedForm<T: {}> extends React.PureComponent<Props<T>> {
  render(): React.Node {
    return <WithHooks {...this.props} />;
  }
}
