import type { UseFormSelf } from "../types";
import type {
  FormInstance,
  FormItemProp,
  FormValidateCallback,
  FormValidationResult,
} from "element-plus";
import type { Ref } from "vue";

import { unref } from "vue";

export const useFormSelf = (instance?: Ref<FormInstance>) => {
  function getForm() {
    const form = unref(instance);
    if (!form) {
      throw new Error(
        "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation"
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
