<template>
  <div :class="ns.b()">
    <span v-if="prefix" :class="ns.e('prefix')">{{ prefix }}</span>
    <el-input-number
      v-bind="getItemProps"
      v-model="minValue"
      :placeholder="placeholder[0]"
      :disabled="disabled"
      @change="emitChange"
      @blur="emitChange"
    />
    <span :class="ns.e('range-separator')">{{ rangeSeparator }}</span>
    <el-input-number
      v-bind="getItemProps"
      v-model="maxValue"
      :placeholder="placeholder[1]"
      :disabled="disabled"
      @change="emitChange"
      @blur="emitChange"
    />
    <span v-if="suffix" :class="ns.e('suffix')">{{ suffix }}</span>
  </div>
</template>

<script setup lang="ts">
import type {
  BasicInputNumberRangeProps,
  BasicInputNumberRangeEmits,
} from "./type";

import { useBasicNamespace } from "@center/composables";

import { computed, ref, watchEffect } from "vue";

const ns = useBasicNamespace("input-number-range");

defineOptions({
  name: "BasicInputNumberRange",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicInputNumberRangeProps>(), {
  modelValue: () => [undefined, undefined],
  placeholder: () => ["请输入数字", "请输入数字"],
  rangeSeparator: "-",
  inputNumberProps: () => ({}),
});

const emit = defineEmits<BasicInputNumberRangeEmits>();

const minValue = ref<number>();
const maxValue = ref<number>();

const getItemProps = computed(() => ({
  controls: false,
  ...props.inputNumberProps,
}));

watchEffect(() => {
  const [minV, maxV] = props.modelValue;
  minValue.value = minV;
  maxValue.value = maxV;
});

const emitChange = () => {
  const value = [minValue.value, maxValue.value];
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
