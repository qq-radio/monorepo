<template>
  <el-radio-group v-bind="getBindValues" v-model="stateLabel">
    <template v-for="(item, index) in stateOptions" :key="index">
      <component
        :is="getComponent(item.isButton)"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :border="item.border"
        :size="item.size"
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
        <BasicRender
          v-else-if="isFunction(render)"
          :render="render"
          :params="getCallbackParams(item)"
        />
        <slot v-else-if="slots.default" v-bind="getCallbackParams(item)" />
        <span v-else>{{ item.label }}</span>
      </component>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import {
  BasicRadioGroupProps,
  BasicRadioGroupEmits,
  RadioOption,
  RadioValue,
  RadioCallbackParams,
} from "./type";

import { useOptionQuery } from "@center/composables";

import { isFunction, isString } from "@center/utils";
import { useAttrs, useSlots, computed, onMounted, ref, watch } from "vue";

import { BasicRender } from "@center/components/basic-render";

defineOptions({
  name: "BasicRadioGroup",
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicRadioGroupProps>(), {});

const emit = defineEmits<BasicRadioGroupEmits>();

const getBindValues = computed(() => ({
  ...attrs,
}));

const {
  options: stateOptions,
  init,
  findLabel,
} = useOptionQuery<RadioOption>(props);

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

const getComponent = (isButton?: boolean) =>
  isButton || props.isButton ? "el-radio-button" : "el-radio";

const getCallbackParams = (item: RadioOption): RadioCallbackParams => ({
  value: stateValue.value,
  label: stateLabel.value,
  option: item,
});

const handleClick = (option: RadioOption) => {
  const { label, value, disabled } = option;

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
