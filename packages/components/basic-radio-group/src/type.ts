export interface BasicRadioGroupProps {
  modelValue?: RadioValue
  isButton?: boolean
  disabled?: boolean

  options?: (RadioOption & Recordable)[]
  api?: () => Promise<unknown>
  resultField?: string
  labelField?: string
  valueField?: string
  formatter?: (option: any) => any

  render?: (params: RadioCallbackParams) => RenderType
}

export interface BasicRadioGroupEmits {
  (e: 'update:modelValue', value: RadioValue): void
  (
    e: 'change',
    params: {
      label?: string
      value?: RadioValue
      option?: RadioOption
    },
  ): void
}

export type RadioValue = undefined | string | number

export interface RadioOption extends Recordable {
  label?: string
  value?: string | number
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'

  isButton?: boolean
  customRender?: (params: RadioCallbackParams) => RenderType
  customSlot?: string
}

export interface RadioCallbackParams {
  label?: string
  value?: RadioValue
  option: RadioOption
}
