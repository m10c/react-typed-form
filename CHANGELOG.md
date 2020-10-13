## Unreleased

- **BC Break**: `isValid: bool` removed from field prop, replaced with more useful `errorList?: string[]`.
- **BC Break**: `validate` form option renamed to `validator`.
- **BC Break**: `validateOnChange` form option renamed to `alwaysRevalidateOnChange`.
- **BC Break**: `addError` form option renamed to `addSubmitError`, to indicate it should only be used during form submission.
- **BC Break**: Several exports renamed, mainly to reflect that _typed_ is very much the recommended mode of operation:
  - `TypedFieldProp` -> `FieldProp`
  - `TypedFormProp` -> `FormObject`
  - `TypedForm` -> `FormComponent`
  - `FieldProp` -> `UntypedFieldProp`
  - `FormProp` -> `UntypedFormObject`
  - `Form` -> `UntypedFormComponent`
- **BC Break**: Remove bridges for React Native and validate.js.
- Added `errors`, `lastErrors`, `hasErrors` and `hasLastErrors` properties to the form object.
- Added `revalidateFields` to the field prop, to opt-in which fields should revalidate on change.
- Added `isDirty` to the field prop, to indicate whether the field has seen a change even since the last submission.
- `onSubmit` can now return a `boolen` or `Promise<boolean>`, to indicate whether submission was successful (useful for code awaiting `handleSubmit`).
- Fixed out of sync internal state (`isInvalid` lagging one change behind) by refactoring to `useReducer`.

## 0.2.3

- Fix usage of `void` in TS types (replace with `undefined`).

## 0.2.2

- Add exported TypeScript type definitions (`index.d.ts`).

## 0.2.0

- **BC Break**: `getFieldProps` renamed to `getField`.
- **BC Break**: minimum version of supported dependencies bumped, most notably React now >=16.8 (for Hooks support).
- **BC Break**: `TypedForm` class components reimplemented using Hooks under the hood, so using a `ref` to access props will no longer work (not that this was an official API).
- Added new `useForm` React Hook, saving from the component hierarchy nesting burden of HOCs and Render Props (and providing cleaner types support).
- Added `values` and `reset` to the FormProp.
- `handleSubmit` is now async and returns a boolean, so you can `await` it.
