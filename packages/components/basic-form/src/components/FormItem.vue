<template>
  <template v-if="schemaItem.title">
    <el-col>
      <component
        v-if="isCustomTitle"
        :is="
          renderItem(
            {
              customRender: schemaItem.customTitleRender,
              customSlot: schemaItem.customTitleSlot,
            },
            callbackParams
          )
        "
      />
      <template v-else>
        <span :class="ns.e('title')">{{ schemaItem.title }}</span>
      </template>
      <el-tooltip
        v-if="schemaItem.titleTooltip"
        placement="top"
        :content="schemaItem.titleTooltip"
      >
        <el-icon style="margin-left: 4px">
          <InfoFilled />
        </el-icon>
      </el-tooltip>
    </el-col>
  </template>
  <template v-else>
    <el-col v-if="!getHidden" v-bind="getColProps">
      <el-form-item
        v-bind="schemaItem.formItemProps"
        :label="getLabel"
        :label-width="getLabelWidth"
        :prop="schemaItem.prop"
        :rules="schemaItem.rules"
      >
        <template #label>
          <component
            v-if="isCustomLabel"
            :is="
              renderItem(
                {
                  customRender: schemaItem.customLabelRender,
                  customSlot: schemaItem.customLabelSlot,
                },
                callbackParams
              )
            "
          />
          <template v-else>
            <span>{{ schemaItem.label }}</span>
          </template>
          <el-tooltip
            v-if="schemaItem.labelTooltip"
            placement="top"
            :content="schemaItem.labelTooltip"
          >
            <el-icon style="margin-left: 4px">
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </template>
        <component
          v-if="isCustomField"
          :is="
            renderItem(
              {
                customRender: schemaItem.customRender,
                customSlot: schemaItem.customSlot,
              },
              callbackParams
            )
          "
        />
        <component
          v-else="schemaItem.component"
          :is="componentValue"
          v-bind="getComponentProps"
          v-model="stateValue"
          :disabled="getDisabled"
          style="width: 100%"
          @change="(...v: unknown[]) => onChange(v)"
        >
          <!-- <template
            v-for="slotName in schemaItem.componentSlots"
            :key="slotName"
            #[slotName]="scope"
          >
            <slot :name="slotName" v-bind="scope" />
          </template> -->
        </component>
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

import { useBasicNamespace, useCustomRender } from "@center/composables";
import { getComponent } from "../tools/component";

import { useFormItemHandler } from "../hooks/useFormItemHandler";

import { useSlots, ref, watchEffect, computed } from "vue";
import { isFunction, isUndefined } from "lodash";
import { InfoFilled } from "@element-plus/icons-vue";

const ns = useBasicNamespace("form-item");

defineOptions({
  name: "FormItem",
});

const slots = useSlots();

const emit = defineEmits<FormItemEmits>();

const props = withDefaults(defineProps<FormItemProps>(), {
  formProps: () => ({}),
  formModel: () => ({}),
});

const componentValue = getComponent(props.schemaItem.component);

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

  if (isFunction(hidden)) {
    return hidden(callbackParams.value);
  }

  return hidden;
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

// 这个删掉，我不需要处理这个，ele自己有处理的
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

const isCustomTitle = computed(
  () => props.schemaItem.customTitleRender || props.schemaItem.customTitleSlot
);

const isCustomLabel = computed(
  () => props.schemaItem.customLabelRender || props.schemaItem.customLabelSlot
);

const isCustomField = computed(
  () => props.schemaItem.customRender || props.schemaItem.customSlot
);
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
