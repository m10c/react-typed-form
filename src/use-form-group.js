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

  const setAllLoading = React.useCallback(
    function setAllLoading(value: boolean) {
      setLoading(value);
      for (const key of keys) {
        const form = formsRef.current[key];
        form?.setLoading(value);
      }
    },
    [keys]
  );

  const submit = React.useCallback(
    async function submit({ whitelistKeys, onFinish } = {}): Promise<boolean> {
      setAllLoading(true);
      let hasErrors = false;

      for (const key of keys) {
        const form = formsRef.current[key];
        if (!form) continue;
        if (whitelistKeys && !whitelistKeys.includes(key)) continue;

        if (!form.hasDirty) continue;

        const result = await form.handleSubmit();
        form.setLoading(true);

        // There were errors on a form
        if (!result) {
          hasErrors = true;
        }
      }

      setHasLastErrors(hasErrors);
      setAllLoading(false);
      onFinish?.({ hasErrors });

      return !hasErrors;
    },
    [keys]
  );

  const _getItemControls = React.useCallback(
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

  const hasKeyOrAlias = React.useCallback(
    (keyOrAlias: string): boolean => {
      if (keys.includes(keyOrAlias)) return true;
      if (
        keys.some((key) => _getItemControls(key).aliases.includes(keyOrAlias))
      ) {
        return true;
      }
      return false;
    },
    [aliases, keys]
  );

  return {
    addKey,
    hasKeyOrAlias,
    keys,

    // replicating form API
    isLoading: loading,
    setLoading: setAllLoading,
    hasLastErrors,
    submit,

    // internal
    _getItemControls,
  };
}
