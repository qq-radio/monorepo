import type {
  FormInstance,
  FormValidateCallback,
  FormItemProp,
  FormValidationResult
} from 'element-plus'
import type { Ref } from 'vue'

export interface UseFormSelfReturn {
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ) => FormValidationResult
  resetFields: (props?: Arrayable<FormItemProp>) => void
  scrollToField: (prop: FormItemProp) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void
}

export interface UseFormSelf {
  (instance?: Ref<FormInstance>): UseFormSelfReturn
}
