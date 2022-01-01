// @flow
/* eslint-disable flowtype/no-weak-types */

import type { FormGroup, FormObject } from './types';

import * as React from 'react';

/**
 * @experimental
 */
export default function useFormGroup({
  initialKeys = [],
}: {
  initialKeys?: string[],
}): FormGroup {
  const [keys, setKeys] = React.useState<string[]>(initialKeys);
  const formsRef = React.useRef<{ [key: string]: FormObject<any> | null }>(
    Object.fromEntries(initialKeys.map((key) => [key, null]))
  );
  const [aliases, setAliases] = React.useState<Array<[string, string]>>([]);

  const [hasLastErrors, setHasLastErrors] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const addKey = React.useCallback(function (key: string): void {
    const forms = { ...formsRef.current, [key]: null };
    setKeys(Object.keys(forms));
    formsRef.current = forms;
  }, []);

  const submit = React.useCallback(
    async function submit({ whitelistKeys, onFinish } = {}): Promise<boolean> {
      setLoading(true);
      let hasErrors = false;

      for (const key of keys) {
        const form = formsRef.current[key];
        form?.setLoading(true);
      }

      for (const key of keys) {
        const form = formsRef.current[key];
        if (!form) continue;
        if (whitelistKeys?.includes(key)) continue;

        if (!form.hasDirty) continue;

        const result = await form.handleSubmit();
        form.setLoading(true);

        // There were errors on a form
        if (!result) {
          hasErrors = true;
        }
      }

      for (const key of keys) {
        const form = formsRef.current[key];
        form?.setLoading(false);
      }

      setHasLastErrors(hasErrors);
      setLoading(false);
      if (!hasErrors) {
        onFinish?.({ hasErrors });
      }

      return !hasErrors;
    },
    [keys]
  );

  const getItemControls = React.useCallback(
    (key: string) => ({
      aliases: aliases.filter((a) => a[0] === key).map((a) => a[1]),
      setForm: (form: FormObject<any>): void => {
        formsRef.current = { ...formsRef.current, [key]: form };
      },
      useSetForm: (form: FormObject<any>) => {
        React.useEffect(() => {
          formsRef.current = { ...formsRef.current, [key]: form };
        }, [form]);
      },
      remove: (): void => {
        // No need to remove old forms
        const forms = Object.fromEntries(
          Object.entries(formsRef.current).filter(([k]) => k !== key)
        );
        formsRef.current = (forms: any);
        setKeys(Object.keys(forms));
      },
      addAlias: (alias: string) => {
        setAliases([...aliases, [key, alias]]);
      },
    }),
    [aliases]
  );

  return {
    addKey,
    keys,
    isLoading: loading,
    hasLastErrors,
    submit,
    getItemControls,
  };
}