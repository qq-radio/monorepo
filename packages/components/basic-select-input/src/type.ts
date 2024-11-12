export interface BasicInputWithSelectProps {
  modelValue?: any
  clearable?: boolean
  disabled?: boolean
}

export interface BasicInputWithSelectEmits {
  (e: 'click'): void
  (e: 'clear'): void
}
