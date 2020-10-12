// @flow
/* eslint-disable flowtype/generic-spacing */

import * as React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import TypedForm from './TypedForm';

import type { ComponentType } from 'react';
import type { TypedFormProp, Options } from './types';

/*
P = Props
C = Wrapped component
RP = Returned props (without injected)
*/

type InjectedProps<T> = { form: TypedFormProp<T> | void };

export default function withForm<
  T: {},
  P: {},
  C: ComponentType<P>
  // Can't have RP in generics otherwise multiple HOC breaks
  // https://github.com/facebook/flow/issues/6587
  // RP: $Diff<React.ElementConfig<C>, { form: TypedFormProp<T> | void }>
>(
  // eslint-disable-next-line flowtype/space-after-type-colon
  optionsFn:
    | Options<T>
    | ((
        ownProps: $Diff<React.ElementConfig<C>, InjectedProps<T>>
      ) => Options<T>)
  // Really want React.ComponentType<RP> but Flow bug:
  // https://github.com/facebook/flow/issues/6057
): (
  Component: C
) => Class<React.Component<$Diff<React.ElementConfig<C>, InjectedProps<T>>>> {
  return function (Component) {
    const Wrapper = (props) => {
      const options =
        typeof optionsFn === 'object' ? optionsFn : optionsFn(props);
      return (
        <TypedForm {...options}>
          {/**/}
          {(form) => <Component form={form} {...props} />}
        </TypedForm>
      );
    };

    Wrapper.displayName = wrapDisplayName(Component, 'withForm');

    return (Wrapper: any); // eslint-disable-line flowtype/no-weak-types
  };
}
