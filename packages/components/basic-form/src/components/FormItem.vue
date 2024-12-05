<template>
  <template v-if="formItem.title">
    <el-col v-bind="getTitleColProps">
      <div :class="ns.e('title')" v-bind="formItem.titleProps">
        <div>
          <component v-if="isCustomTitle" :is="renderCustomTitle" />
          <span v-else :class="ns.e('title-text')">{{ formItem.title }}</span>
        </div>
        <div>
          <component
            v-if="formItem.titleTooltip"
            :is="renderTooltip(formItem.titleTooltip)"
          />
        </div>
      </div>
    </el-col>
  </template>
  <template v-else>
    <el-col v-if="!getHidden" v-bind="getColProps">
      <el-form-item
        v-bind="formItem.formItemProps"
        :label="getLabel"
        :prop="formItem.prop"
        :rules="getRules"
      >
        <template #label>
          <div :class="ns.e('label')">
            <div>
              <component v-if="isCustomLabel" :is="renderCustomLabel" />
              <span v-else>{{ formItem.label }}</span>
            </div>
            <div>
              <component
                v-if="formItem.labelTooltip"
                :is="renderTooltip(formItem.labelTooltip)"
              />
            </div>
          </div>
        </template>
        <template #default>
          <component v-if="isCustomField" :is="renderCustomField" />
          <component
            v-else="formItem.component"
            :is="renderComponent"
            v-bind="formItem.componentProps"
            v-model="stateValue"
            :disabled="getDisabled"
            @change="(...v: unknown[]) => onChange(v)"
          >
            <template
              v-for="(fieldSlot, key) in formItem.componentSlots"
              :key="key"
              #[key]="data"
            >
              <component :is="fieldSlot" v-bind="data" />
            </template>
          </component>
        </template>
      </el-form-item>
    </el-col>
  </template>
</template>

<script lang="tsx" setup>
import type {
  FormItemProps,
  FormItemEmits,
  FormItemCallbackParams,
  FieldValue,
  FormSchema,
  EnhancedFormSchema,
  ComponentProps,
} from "../types";

import { useBasicNamespace, useCustomRender } from "@center/composables";
import { getComponent } from "../tools/component";

import { useFormItemHandler } from "../hooks/useFormItemHandler";

import { useSlots, ref, watchEffect, computed } from "vue";
import { isFunction, isUndefined, merge } from "lodash";
import { InfoFilled } from "@element-plus/icons-vue";
import { normalizeSchema } from "../tools/normalize-schema";
import { normalizeRule } from "../tools/normalize-rule";

const ns = useBasicNamespace("form-item");

defineOptions({
  name: "FormItem",
});

const slots = useSlots();

const props = withDefaults(defineProps<FormItemProps>(), {
  formProps: () => ({}),
  formModel: () => ({}),
});

const emit = defineEmits<FormItemEmits>();

const stateValue = ref<FieldValue>("");

const formItem = ref<EnhancedFormSchema>({
  prop: "",
  label: "",
  component: "input",
  componentProps: {},
});

watchEffect(() => {
  stateValue.value = props.modelValue;
});

const callbackParams = computed<FormItemCallbackParams>(() => ({
  value: props.modelValue,
  model: props.formModel,
  schema: props.schemaItem,
}));

const getComponentProps = (schemaItem: FormSchema) => {
  const { componentProps: originComponentProps } = schemaItem;
  let componentProps = originComponentProps as ComponentProps;
  if (isFunction(originComponentProps)) {
    componentProps = originComponentProps({
      ...callbackParams.value,
      methods: props.formMethods,
    });
  }
  return normalizeSchema({
    ...schemaItem,
    componentProps,
    component: schemaItem.component || "input",
  });
};

watchEffect(() => {
  formItem.value = getComponentProps(props.schemaItem);
  console.log("formItem.value: 不要伤害我", formItem.value);
});

const getHidden = computed(() => {
  const { hidden } = formItem.value;
  return isFunction(hidden) ? hidden(callbackParams.value) : hidden;
});

const getTitleColProps = computed(() =>
  merge(props.formProps.titleColProps, formItem.value.titleColProps)
);

const getColProps = computed(() =>
  merge(props.formProps.colProps, formItem.value.colProps)
);

const getLabel = computed(() => {
  const hasLabel = isUndefined(formItem.value.hasLabel)
    ? props.formProps.hasLabel
    : formItem.value.hasLabel;
  return hasLabel ? formItem.value.label : "";
});

const getRules = computed(() => normalizeRule(formItem.value));

const getDisabled = computed(() => {
  const {
    formProps: { disabled: formDisabled },
  } = props;
  const { disabled } = formItem.value;

  if (isUndefined(disabled)) {
    return formDisabled;
  }

  if (isFunction(disabled)) {
    return disabled(callbackParams.value);
  }

  return disabled;
});

const { handleChange } = useFormItemHandler({
  emit,
});

const onChange = (values: unknown[]) => {
  handleChange(values, formItem.value);
  emit("update:modelValue", stateValue.value);
  emit("change", stateValue.value, formItem.value);
};

const { renderItem } = useCustomRender({ slots });

const isCustomTitle =
  formItem.value.customTitleRender || formItem.value.customTitleSlot;

const renderCustomTitle = renderItem(
  {
    customRender: formItem.value.customTitleRender,
    customSlot: formItem.value.customTitleSlot,
  },
  callbackParams.value
);

const isCustomLabel =
  formItem.value.customLabelRender || formItem.value.customLabelSlot;

const renderCustomLabel = renderItem(
  {
    customRender: formItem.value.customLabelRender,
    customSlot: formItem.value.customLabelSlot,
  },
  callbackParams.value
);

const isCustomField = formItem.value.customRender || formItem.value.customSlot;

const renderCustomField = renderItem(
  {
    customRender: formItem.value.customRender,
    customSlot: formItem.value.customSlot,
  },
  callbackParams.value
);

const renderComponent = getComponent(formItem.value.component);

const renderTooltip = (content) =>
  content && (
    <el-tooltip placement="top" content={content}>
      <el-icon>
        <InfoFilled />
      </el-icon>
    </el-tooltip>
  );
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
