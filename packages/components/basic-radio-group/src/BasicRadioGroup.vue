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
        <component
          v-if="isFunction(item.customRender)"
          :is="item.customRender(getCallbackParams(item))"
        />
        <slot
          v-else-if="isString(item.customSlot)"
          :name="item.customSlot"
          v-bind="getCallbackParams(item)"
        />
        <component
          v-else-if="isFunction(render)"
          :is="render(getCallbackParams(item))"
        />
        <slot v-else-if="slots.default" v-bind="getCallbackParams(item)" />
        <span v-else>{{ item.label }}</span>
      </component>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
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

defineOptions({
  name: "BasicRadioGroup",
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicRadioGroupProps>(), {});

const emit = defineEmits<BasicRadioGroupEmits>();

const getBindValues = computed(() => ({
  ...attrs,
}));

const stateLabel = ref<string>();
const stateValue = ref<RadioValue>();

const {
  options: stateOptions,
  init,
  findLabel,
  findOption,
} = useOptionQuery<RadioOption>(props);

onMounted(() => {
  init();
});

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

  emitChange();
};

const emitChange = () => {
  emit("update:modelValue", stateValue.value);
  emit("change", {
    value: stateValue.value,
    label: stateLabel.value,
    option: findOption(stateValue.value),
  });
};
</script>
