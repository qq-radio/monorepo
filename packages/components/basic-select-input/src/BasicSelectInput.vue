<template>
  <el-input
    v-model="stateValue"
    v-bind="attrs"
    :disabled="disabled"
    readonly
    @click="emit('click')"
  >
    <template v-if="!disabled" #prepend>
      <el-button :icon="Search" @click="emit('click')" />
    </template>
    <template v-if="clearable && !disabled" #append>
      <span @click="emit('clear')">清空</span>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import type {
  BasicInputWithSelectProps,
  BasicInputWithSelectEmits,
} from "./type";

import { ref, watchEffect, useAttrs } from "vue";

import { Search } from "@element-plus/icons-vue";

defineOptions({
  name: "BasicSelectInput",
});

const attrs = useAttrs();

const props = withDefaults(defineProps<BasicInputWithSelectProps>(), {
  clearable: true,
});

const emit = defineEmits<BasicInputWithSelectEmits>();

const stateValue = ref("");

watchEffect(() => {
  stateValue.value = props.modelValue;
});
</script>
