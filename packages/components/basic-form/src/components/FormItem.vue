<template>
  <template v-if="schemaItem.component === 'sub-title'">
    <el-col :class="ns.e('sub-title')">
      {{ schemaItem.label }}
    </el-col>
  </template>
  <template v-else>
    <el-col v-if="getVIf" v-bind="getColProps">
      <el-form-item
        v-bind="schemaItem.formItemProps"
        :label="getLabel"
        :label-width="getLabelWidth"
        :prop="schemaItem.prop"
        :rules="schemaItem.rules"
      >
        <slot
          v-if="schemaItem.slot"
          :name="schemaItem.slot"
          v-bind="callbackParams"
          style="width: 100%"
        />
        <component
          :is="getComponent(schemaItem.component)"
          v-else
          v-bind="getComponentProps"
          v-model="stateValue"
          :disabled="getDisabled"
          style="width: 100%"
          @change="(...v: unknown[]) => onChange(v)"
        />
        <div v-if="getVIfMax" style="text-align: right; width: 100%">
          {{ getMaxLimitText }}
        </div>
      </el-form-item>
    </el-col>
  </template>
</template>

<script lang="ts" setup>
import type {
  FormItemProps,
  FormItemEmits,
  FormItemCallbackParams,
  FieldValue,
} from "../types";

import { useBasicNamespace } from "@center/composables";

import { getComponent } from "../tools/component";
import { useFormItemHandler } from "../hooks/useFormItemHandler";

import { ref, watchEffect, computed } from "vue";
import { isFunction, isString, isUndefined } from "lodash";

const ns = useBasicNamespace("form-item");

defineOptions({
  name: "FormItem",
});

const emit = defineEmits<FormItemEmits>();

const props = withDefaults(defineProps<FormItemProps>(), {
  formProps: () => ({}),
  formModel: () => ({}),
});

const stateValue = ref<FieldValue>("");

watchEffect(() => {
  stateValue.value = props.modelValue;
});

const callbackParams = computed<FormItemCallbackParams>(() => ({
  value: props.modelValue,
  model: props.formModel,
  schema: props.schemaItem,
}));

const getVIf = computed(() => {
  const {
    schemaItem: { vIf },
  } = props;

  if (isFunction(vIf)) {
    return vIf(callbackParams.value);
  }

  return vIf !== false;
});

const getColProps = computed(() => {
  const {
    formProps: { colProps: formColProps },
    schemaItem: { colProps },
  } = props;

  if (isUndefined(colProps)) {
    return formColProps;
  }

  return colProps;
});

const getLabel = computed(() => {
  const {
    formProps: { hasLabel: formHasLabel },
    schemaItem: { hasLabel, label },
  } = props;

  const flag = isUndefined(hasLabel) ? formHasLabel : hasLabel;
  return flag ? label : "";
});

const getLabelWidth = computed(() => {
  const {
    formProps: { labelWidth: formLabelWidth },
    schemaItem: { labelWidth },
  } = props;

  if (isUndefined(labelWidth)) {
    return formLabelWidth;
  }

  return labelWidth;
});

const getComponentProps = computed(() => {
  const {
    schemaItem: { componentProps },
  } = props;

  if (isFunction(componentProps)) {
    return componentProps(props.formMethods);
  }

  return componentProps;
});

const getDisabled = computed(() => {
  const {
    formProps: { disabled: formDisabled },
    schemaItem: { disabled },
  } = props;

  if (isUndefined(disabled)) {
    return formDisabled;
  }

  if (isFunction(disabled)) {
    return disabled(callbackParams.value);
  }

  return disabled;
});

const getVIfMax = computed(() => {
  const {
    schemaItem: { component, showLimitText, max },
  } = props;

  return ["input", "textarea"].includes(component) && showLimitText && max;
});

const getMaxLimitText = computed(() => {
  const {
    schemaItem: { max },
  } = props;

  if (!isString(props.modelValue)) {
    return;
  }

  return (props.modelValue?.length || 0) + "/" + max;
});

const { handleChange } = useFormItemHandler({
  emit,
});

const onChange = (values: unknown[]) => {
  const { schemaItem } = props;

  handleChange(values, schemaItem);

  emit("update:modelValue", stateValue.value);
  emit("change", stateValue.value, schemaItem);
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
