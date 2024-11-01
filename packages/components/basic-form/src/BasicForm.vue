<template>
  <el-form ref="formInstance" v-bind="getBindValues">
    <el-row v-bind="getProps.rowProps">
      <template v-for="schemaItem in formSchemas" :key="schemaItem.prop">
        <FormItem
          v-model="formModel[schemaItem.prop]"
          v-bind="{
            schemaItem,
            formProps,
            formModel,
            formMethods,
          }"
          @field-change="setFieldsValue"
          @change="emitUpdateModel"
        >
          <template
            v-for="slotName in Object.keys(slots)"
            :key="slotName"
            #[slotName]="scope"
          >
            <slot :name="slotName" v-bind="scope" />
          </template>
        </FormItem>
      </template>
      <el-col v-if="getProps.hasFooter" v-bind="getProps.buttonColProps">
        <slot name="footer" v-bind="{ reset, submit }">
          <el-button v-if="getProps.hasReset" @click="reset">
            {{ getProps.resetText }}
          </el-button>
          <el-button type="primary" :loading="getProps.loading" @click="submit">
            {{ getProps.submitText }}
          </el-button>
        </slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import type { BasicFormProps, BasicFormEmits, FormMethods } from "./types";
import type { FormInstance } from "element-plus";

import { useFormEvent } from "./hooks/useFormEvent";
import { useFormSelf } from "./hooks/useFormSelf";

import { useAttrs, useSlots, ref, computed, unref, onMounted } from "vue";
import { isFunction, pick } from "lodash";

import FormItem from "./components/FormItem.vue";

defineOptions({
  name: "BasicForm",
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

const emit = defineEmits<BasicFormEmits>();

const props = withDefaults(defineProps<BasicFormProps>(), {
  modelValue: () => ({}),
  schemas: () => [],
  loading: false,

  rowProps: () => ({
    gutter: 20,
  }),
  colProps: () => ({ span: 24 }),
  formItemProps: () => ({}),

  hasLabel: true,
  labelSuffix: ":",
  labelWidth: "100px",
  labelPosition: "right",

  hasFooter: false,
  hasReset: true,
  resetText: "重置",
  submitText: "提交",

  hasErrorTip: true,
});

const propsRef = ref<Partial<BasicFormProps>>();

const getProps = computed<BasicFormProps>(() => {
  return { ...props, ...unref(propsRef) };
});

function setProps(partialProps: Partial<BasicFormProps>) {
  propsRef.value = { ...unref(propsRef), ...partialProps };
}

const getBindValues = computed(() => {
  const partialProps = pick(
    getProps.value,
    "disabled",
    "labelWidth",
    "labelPosition",
    "labelSuffix",
    "labelWidth"
  );
  return {
    ...attrs,
    ...partialProps,
    model: formModel,
  };
});

const formProps = computed(() => {
  const partialProps = pick(
    getProps.value,
    "disabled",
    "formItemProps",
    "colProps",
    "hasLabel",
    "labelSuffix",
    "labelWidth"
  );
  return {
    ...partialProps,
  };
});

const formInstance = ref<FormInstance>();

const {
  formSchemas,
  formModel,

  updateSchema,
  removeSchema,
  appendSchema,

  getFieldValue,
  getFieldsValue,
  setFieldsValue,
  resetFieldsValue,
  emitUpdateModel,
} = useFormEvent(getProps, {
  emit,
});

const { validate, validateField, resetFields, scrollToField, clearValidate } =
  useFormSelf(formInstance);

const submit = async () => {
  console.log("表单填写值", formModel.value);
  try {
    const valid = await validate();
    if (!valid) {
      return false;
    }

    if (isFunction(getProps.value.modelAdapter)) {
      emit("submit", getProps.value.modelAdapter(formModel.value));
    } else {
      emit("submit", formModel.value);
    }
  } catch (error: unknown) {
    console.error("表单提交错误", error);
  }
  return false;
};

const reset = () => {
  resetFieldsValue();
  resetFields();
  emitUpdateModel();
  emit("reset");
};

const formMethods: FormMethods = {
  setProps,
  submit,
  reset,

  /**
   * useFormEvent
   */
  updateSchema,
  removeSchema,
  appendSchema,

  getFieldValue,
  getFieldsValue,
  setFieldsValue,
  resetFieldsValue,

  /**
   * useFormSelf
   */
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
};

onMounted(() => {
  emit("register", formMethods);
});

defineExpose({
  ...formMethods,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
