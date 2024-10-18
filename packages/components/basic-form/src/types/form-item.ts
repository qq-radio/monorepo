import type { BasicFormProps, FormSchema, FormMethods, ComponentType } from './'

export type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | string[]
  | number[]
  | boolean[]
  | Date[]
  | [Date, Date]
  | [number, number]
  | [string, string]
  | string[][]
  | number[][]
  | Recordable

type FormProps = Pick<
  BasicFormProps,
  | 'disabled'
  | 'formItemProps'
  | 'colProps'
  | 'hasLabel'
  | 'labelSuffix'
  | 'labelWidth'
>

export interface FormItemCallbackParams {
  value: FieldValue
  model: Recordable<any>
  schema: FormSchema
}

export interface FormItemProps {
  modelValue: FieldValue
  schemaItem: FormSchema & { component: ComponentType }

  formProps: FormProps
  formModel: Recordable
  formMethods: FormMethods
}

export interface FormItemEmits {
  (e: 'update:modelValue', value: FieldValue): void
  (e: 'change', value: FieldValue, schemaItem: FormSchema): void
  (e: 'field-change', values: Recordable): void
}
