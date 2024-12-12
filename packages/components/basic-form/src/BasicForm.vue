<template>
  <el-form ref="formInstance" v-bind="getBindValues">
    <el-row v-bind="getProps.rowProps">
      <template v-for="schemaItem in formSchemas" :key="schemaItem.prop">
        <FormItem
          v-if="schemaItem.prop"
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
            v-for="name in Object.keys(slots)"
            :key="name"
            #[name]="scope"
          >
            <slot :name="name" v-bind="scope" />
          </template>
        </FormItem>
      </template>
    </el-row>
    <el-row>
      <el-col v-if="getProps.hasFooter" v-bind="getProps.footerColProps">
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

<script setup lang="ts">
import type { BasicFormProps, BasicFormEmits, FormMethods } from "./types";
import type { FormValidateCallback } from "element-plus";

import { useFormEvent } from "./hooks/useFormEvent";
import { useFormSelf } from "./hooks/useFormSelf";

import { useAttrs, useSlots, ref, computed, onMounted } from "vue";
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
    justify: "start",
  }),
  colProps: () => ({ span: 24 }),
  itemProps: () => ({}),

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
  return {
    ...props,
    ...propsRef.value,
  };
});

function setProps(partialProps: Partial<BasicFormProps>) {
  propsRef.value = {
    ...propsRef.value,
    ...partialProps,
  };
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

const formProps = computed(() =>
  pick(
    getProps.value,
    "titleColProps",
    "disabled",
    "itemProps",
    "colProps",
    "hasLabel",
    "labelSuffix",
    "labelWidth"
  )
);

const formInstance = ref();

const {
  formSchemas,
  formModel,

  updateSchema,
  removeSchema,
  appendSchema,

  getFieldValue,
  getFieldsValue,
  setFieldsValue,
  emitUpdateModel,
} = useFormEvent(
  computed(() => ({
    schemas: getProps.value.schemas,
    modelValue: getProps.value.modelValue,
  })),
  {
    emit,
  }
);

const { validate, validateField, resetFields, scrollToField, clearValidate } =
  useFormSelf(formInstance);

const submit = () => {
  return new Promise((resolve, reject) => {
    validate()
      .then(() => {
        const { modelAdapter } = getProps.value;
        const values = isFunction(modelAdapter)
          ? modelAdapter(formModel.value)
          : formModel.value;
        console.log("表单填写值:", values);
        emit("submit", values);
        resolve(values);
      })
      .catch((error: FormValidateCallback) => {
        console.error("表单提交错误:", error);
        emit("submit-error", error);
        // reject(error);
      });
  });
};

const reset = () => {
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
