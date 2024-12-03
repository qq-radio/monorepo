import type {
  FormInstance,
  FormItemProp,
  FormValidateCallback,
  FormValidationResult,
} from "element-plus";
import type { Ref } from "vue";

import { unref } from "vue";

export type UseFormSelfReturn = ReturnType<typeof useFormSelf>;

export const useFormSelf = (instance?: Ref<FormInstance>) => {
  function getForm() {
    const form = unref(instance);
    if (!form) {
      throw new Error(
        "BasicForm实例还未创建，请确保实例创建成功后再调用组件方法"
      );
    }
    return form;
  }

  function validate(callback?: FormValidateCallback) {
    return getForm().validate(callback);
  }

  function validateField(
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ): FormValidationResult {
    return getForm().validateField(props, callback);
  }

  function resetFields(props?: Arrayable<FormItemProp>) {
    getForm().resetFields(props);
  }

  function scrollToField(prop: FormItemProp) {
    getForm().scrollToField(prop);
  }

  function clearValidate(props?: Arrayable<FormItemProp>) {
    getForm().clearValidate(props);
  }

  return {
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  };
};
