export interface BasicSelectProps {
  modelValue?: SelectValue
  hasCheckAll?: boolean
  multiple?: boolean
  clearable?: boolean

  options?: (SelectOption & Recordable)[]
  api?: () => Promise<unknown>
  resultField?: string
  labelField?: string
  valueField?: string
  formatter?: (option: any) => any

  render?: (params: SelectCallbackParams) => RenderType
}

export interface BasicSelectEmits {
  (e: 'update:modelValue', value: SelectValue): void
  (
    e: 'change',
    params: {
      labels?: string[]
      values?: SelectValue
      options?: SelectOption | SelectOption[]
    },
  ): void
}

export type SelectValue = any

export interface SelectOption extends Recordable {
  label?: string
  value?: string | number
  disabled?: boolean

  customRender?: (params: SelectCallbackParams) => RenderType
  customSlot?: string
}

export interface SelectCallbackParams {
  labels?: string[]
  values?: SelectValue
  option: SelectOption
}
