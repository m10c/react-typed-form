// @flow
/* eslint-disable flowtype/generic-spacing */

import * as React from 'react';

import type { ComponentType } from 'react';
import type { FieldProps, FormErrors, FormProp, ValuesMap } from './types';

/*
P = Props
RP = Returned props (without injected)
*/

type Options<RP> = $ReadOnly<{|
  // Required
  onSubmit: (
    values: ValuesMap,
    ownProps: RP,
    helpers: { setLoading: boolean => void }
  ) => void | Promise<void>,

  // Optional
  pristineValues?: ValuesMap, // Pristine values don't count as changes
  defaultValues?: ValuesMap, // Default values do
  validate?: (values: ValuesMap) => FormErrors,
  validateOnChange?: boolean,
|}>;

type State = {|
  values: ValuesMap,
  invalid: string[],
  lastErrors: FormErrors,
  loading: boolean,
|};

export default function valueForm<
  P: {},
  //
  RP: $Diff<P, { form: FormProp | void }>
>(options: Options<RP>): (Component: ComponentType<P>) => ComponentType<RP> {
  return function(Component) {
    return class WrapperComponent extends React.PureComponent<RP, State> {
      constructor(props: RP) {
        super(props);

        const values = options.defaultValues || {};
        this.state = {
          values,
          invalid: this.determineInvalid(values),
          lastErrors: {},
          loading: false,
        };
      }

      determineInvalid = (values: ValuesMap) =>
        options.validate && options.validateOnChange
          ? Object.keys(options.validate(values))
          : [];

      handleValueChange = (field: string, value: mixed): void => {
        // Must be function for some race condition (?)
        this.setState(currentState => {
          const values = { ...currentState.values, [field]: value };
          return {
            ...currentState,
            values,
            invalid: this.determineInvalid(values),
          };
        });
      };

      handleSubmit = () => {
        const { values } = this.state;

        if (options.validate) {
          const errors = options.validate(values);
          this.setState({ lastErrors: errors });
          if (Object.keys(errors).length > 0) return;
        }

        options.onSubmit(values, this.props, {
          setLoading: loading => {
            this.setState({ loading });
          },
        });
      };

      getFieldProps = (field: string): FieldProps => {
        const { pristineValues: pristine } = options;
        const { values, invalid, lastErrors, loading } = this.state;

        let value;
        if (values[field] !== undefined) {
          value = values[field];
        }
        if (value === undefined && pristine && pristine[field] !== undefined) {
          value = pristine[field];
        }

        // Add spaces to the label
        const label = field.replace(/([a-z])([A-Z])/g, '$1 $2');

        return {
          name: field,
          label,
          value,
          handleValueChange: this.handleValueChange.bind(this, field),
          isLoading: loading,
          isValid: options.validateOnChange && !invalid.includes(field),
          lastErrors: lastErrors[field],
        };
      };

      render() {
        const { loading } = this.state;
        return (
          <Component
            {...this.props}
            form={{
              getFieldProps: this.getFieldProps,
              handleSubmit: this.handleSubmit,
              isLoading: loading,
            }}
          />
        );
      }
    };
  };
}
