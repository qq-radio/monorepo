export interface BasicCheckboxGroupProps {
  modelValue?: CheckboxValue
  isButton?: boolean
  hasCheckAll?: boolean

  options?: (CheckboxOption & Recordable)[]
  api?: () => Promise<unknown>
  resultField?: string
  labelField?: string
  valueField?: string
  formatter?: (option: any) => any

  render?: (params: CheckboxCallbackParams) => RenderType
}

export interface BasicCheckboxGroupEmits {
  (e: 'update:modelValue', value: CheckboxValue): void
  (
    e: 'change',
    params: {
      labels?: string[]
      values?: CheckboxValue
      options?: CheckboxOption[]
    },
  ): void
}

export type CheckboxValue = (string | number | boolean)[]

export interface CheckboxOption  extends Recordable{
  label?: string
  value?: string | number
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'

  isButton?: boolean
  customRender?: (params: CheckboxCallbackParams) => RenderType
  customSlot?: string
}

export interface CheckboxCallbackParams {
  labels?: string[]
  values?: CheckboxValue
  option: CheckboxOption
}
