<template>
  <template v-if="schemaItem.title">
    <el-col v-bind="getTitleColProps">
      <component v-if="isCustomTitle" :is="renderCustomTitle" />
      <span v-else :class="ns.e('title')">{{ schemaItem.title }}</span>
      <component
        v-if="schemaItem.titleTooltip"
        :is="renderTooltip(schemaItem.titleTooltip)"
      />
    </el-col>
  </template>
  <template v-else>
    <el-col v-if="!getHidden" v-bind="getColProps">
      <el-form-item
        v-bind="schemaItem.formItemProps"
        :label="getLabel"
        :prop="schemaItem.prop"
        :rules="schemaItem.rules"
      >
        <template #label>
          <component v-if="isCustomLabel" :is="renderLabelTitle" />
          <span v-else>{{ schemaItem.label }}</span>
          <component
            v-if="schemaItem.labelTooltip"
            :is="renderTooltip(schemaItem.labelTooltip)"
          />
        </template>
        <template #default>
          <component v-if="isCustomField" :is="renderLabelField" />
          <component
            v-else="schemaItem.component"
            :is="renderComponent"
            v-bind="getComponentProps"
            v-model="stateValue"
            :disabled="getDisabled"
            @change="(...v: unknown[]) => onChange(v)"
          >
            <template
              v-for="(fieldSlot, key) in schemaItem.componentSlots"
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
} from "../types";

import { useBasicNamespace, useCustomRender } from "@center/composables";
import { getComponent } from "../tools/component";

import { useFormItemHandler } from "../hooks/useFormItemHandler";

import { useSlots, ref, watchEffect, computed } from "vue";
import { isFunction, isUndefined, merge } from "lodash";
import { InfoFilled } from "@element-plus/icons-vue";

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

watchEffect(() => {
  stateValue.value = props.modelValue;
});

const callbackParams = computed<FormItemCallbackParams>(() => ({
  value: props.modelValue,
  model: props.formModel,
  schema: props.schemaItem,
}));

const getHidden = computed(() => {
  const {
    schemaItem: { hidden },
  } = props;

  return isFunction(hidden) ? hidden(callbackParams.value) : hidden;
});

const getTitleColProps = computed(() =>
  merge(props.formProps.titleColProps, props.schemaItem.titleColProps)
);

const getColProps = computed(() =>
  merge(props.formProps.colProps, props.schemaItem.colProps)
);

const getLabel = computed(() => {
  const hasLabel = isUndefined(props.schemaItem.hasLabel)
    ? props.formProps.hasLabel
    : props.schemaItem.hasLabel;
  return hasLabel ? props.schemaItem.label : "";
});

const getComponentProps = computed(() => {
  const {
    schemaItem: { componentProps },
  } = props;

  if (isFunction(componentProps)) {
    return componentProps({
      ...callbackParams.value,
      methods: props.formMethods,
    });
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

const { handleChange } = useFormItemHandler({
  emit,
});

const onChange = (values: unknown[]) => {
  const { schemaItem } = props;

  handleChange(values, schemaItem);

  emit("update:modelValue", stateValue.value);
  emit("change", stateValue.value, schemaItem);
};

const { renderItem } = useCustomRender({ slots });

const isCustomTitle =
  props.schemaItem.customTitleRender || props.schemaItem.customTitleSlot;

const renderCustomTitle = renderItem(
  {
    customRender: props.schemaItem.customTitleRender,
    customSlot: props.schemaItem.customTitleSlot,
  },
  callbackParams.value
);

const isCustomLabel =
  props.schemaItem.customLabelRender || props.schemaItem.customLabelSlot;

const renderLabelTitle = renderItem(
  {
    customRender: props.schemaItem.customLabelRender,
    customSlot: props.schemaItem.customLabelSlot,
  },
  callbackParams.value
);

const isCustomField =
  props.schemaItem.customRender || props.schemaItem.customSlot;

const renderLabelField = renderItem(
  {
    customRender: props.schemaItem.customRender,
    customSlot: props.schemaItem.customSlot,
  },
  callbackParams.value
);

const renderComponent = getComponent(props.schemaItem.component);

const renderTooltip = (content) =>
  content && (
    <el-tooltip placement="top" content={content}>
      <el-icon style="margin-left: 4px; vertical-align: middle">
        <InfoFilled />
      </el-icon>
    </el-tooltip>
  );
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
