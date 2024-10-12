<template>
  <el-radio-group v-bind="getBindValues" v-model="stateLabel">
    <template v-for="(item, index) in stateOptions" :key="index">
      <component
        :is="getComponent(item.type)"
        v-bind="item.customProps"
        :label="item.label"
        :value="item.value"
        @click.native.prevent="handleClick(item)"
      >
        <BasicRender
          v-if="isFunction(item.customRender)"
          :render="item.customRender"
          :params="getCallbackParams(item)"
        />
        <slot
          v-else-if="isString(item.customSlot)"
          :name="item.customSlot"
          v-bind="getCallbackParams(item)"
        />
        <span v-else>
          {{ item.label }}
        </span>
      </component>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import {
  BasicRadioProps,
  BasicRadioEmits,
  SingleRadio,
  RadioType,
  RadioValue,
} from "./type";

import { useOptionQuery } from "@center/composables";

import { isFunction, isString } from "@center/utils";

import { useAttrs, computed, onMounted, ref, watch } from "vue";

import { BasicRender } from "@center/components/basic-render";

defineOptions({
  name: "BasicRadioGroup",
});

const attrs = useAttrs();

const props = withDefaults(defineProps<BasicRadioProps>(), {
  type: "radio",
});

const emit = defineEmits<BasicRadioEmits>();

const getBindValues = computed(() => ({
  ...attrs,
}));

const { options: stateOptions, init, findLabel } = useOptionQuery(props);

const stateLabel = ref<string>();
const stateValue = ref<RadioValue>();

watch(
  () => props.modelValue,
  () => {
    stateValue.value = props.modelValue;
    stateLabel.value = findLabel(props.modelValue);
  },
  { immediate: true }
);

const getComponent = (type?: RadioType) => {
  const name = type || props.type;
  return `el-${name}`;
};

const getCallbackParams = (item: SingleRadio) => ({
  value: stateValue.value,
  label: stateLabel.value,
  option: item,
});

const handleClick = (option: SingleRadio) => {
  const { label, value, customProps: { disabled } = {} } = option;

  if (disabled === true) {
    return;
  }

  const flag = stateLabel.value === label;

  stateLabel.value = flag ? undefined : label;
  stateValue.value = flag ? "" : value;

  emit("update:modelValue", stateValue.value);
  emit("change", {
    value,
    label,
    option: flag ? undefined : option,
  });
};

onMounted(() => {
  init();
});
</script>
