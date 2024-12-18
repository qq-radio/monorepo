import type { InputNumberProps } from 'element-plus'

export type ModelValue = (number | undefined)[]

export interface BasicInputNumberRangeProps {
  modelValue?: ModelValue
  disabled?: boolean
  startPlaceholder?: string
  endPlaceholder?: string
  inputNumberProps?: Partial<InputNumberProps>

  prefix?: string
  suffix?: string
  rangeSeparator?: string
}

export interface BasicInputNumberRangeEmits {
  (e: 'update:modelValue', value: ModelValue): void
  (e: 'change', value: ModelValue): void
}
