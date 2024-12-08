import type { BasicFormProps, FormSchema, FormMethods, FieldValue } from "./";

export interface FormItemProps {
  modelValue: FieldValue;
  schemaItem: FormSchema;

  formProps: FormProps;
  formModel: Recordable;
  formMethods: FormMethods;
}

export interface FormItemEmits {
  (e: "update:modelValue", value: FieldValue): void;
  (e: "change", value: FieldValue, schemaItem: FormSchema): void;
  (e: "field-change", values: Recordable): void;
}

type FormProps = Pick<
  BasicFormProps,
  | "colProps"
  | "titleColProps"
  | "itemProps"
  | "disabled"
  | "hasLabel"
  | "labelSuffix"
  | "labelWidth"
>;

export interface FormItemCallbackParams {
  value: FieldValue;
  model: Recordable;
  schema: FormSchema;
}

export interface FormItemComponentPropsCallbackParams {
  value: FieldValue;
  model: Recordable;
  schema: FormSchema;
  methods: FormMethods;
}
