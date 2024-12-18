export interface BasicTreeSelectProps {
  modelValue?: TreeSelectModelValue
  clearable?: boolean

  data?: Recordable[]
  api?: () => Promise<any>
  resultField?: string
}

export interface BasicTreeSelectEmits {
  (e: 'update:modelValue', value: TreeSelectModelValue): void
  (
    e: 'change',
    params: {
      value: TreeSelectModelValue
      // node: Recordable[];
    },
  ): void
}

export type TreeSelectModelValue = string | number | boolean | object
