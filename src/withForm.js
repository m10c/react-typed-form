// @flow
/* eslint-disable flowtype/generic-spacing */

import * as React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import TypedForm from './TypedForm';

import type { ComponentType } from 'react';
import type { TypedFormProp, Options } from './types';

/*
P = Props
RP = Returned props (without injected)
*/

type MoreOptions<T> = $ReadOnly<{|
  ...Options<T>,
  defaultValues?: T,
|}>;

export default function withForm<
  T: {},
  P: {},
  RP: $Diff<P, { form: TypedFormProp<T> | void }>
>(
  optionsFn: MoreOptions<T> | ((ownProps: RP) => MoreOptions<T>)
): (
  Component: ComponentType<P> | React$StatelessFunctionalComponent<P>
) => ComponentType<RP> {
  return function(Component) {
    const Wrapper = props => {
      const options =
        typeof optionsFn === 'object' ? optionsFn : optionsFn(props);
      return (
        // $FlowFixMe <0.71.0
        <TypedForm {...options}>
          {/**/}
          {form => <Component form={form} {...props} />}
        </TypedForm>
      );
    };

    Wrapper.displayName = wrapDisplayName(Component, 'withForm');

    return Wrapper;
  };
}
