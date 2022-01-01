// @flow
/* eslint-disable flowtype/no-weak-types */

import type { FormGroup, FormGroupItemControls, FormObject } from './types';

import * as React from 'react';

/**
 * @experimental
 */
export default function useFormGrouptem({
  formGroup,
  key,
  form,
}: {
  formGroup: FormGroup,
  key: string,
  form?: FormObject<any>,
}): FormGroupItemControls {
  const itemControls = formGroup.getItemControls(key);

  React.useEffect(() => {
    form && itemControls.setForm(form);
  }, [itemControls, form]);

  return itemControls;
}
