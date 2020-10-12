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
