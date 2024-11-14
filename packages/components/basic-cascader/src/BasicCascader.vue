<template>
  <el-cascader
    ref="cascaderRef"
    v-bind="getBindValues"
    v-model="stateValue"
    :options="cascaderDatas"
    @change="emitChange"
  >
    <template v-for="(_, key) in slots" :key="key" #[key]="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { BasicCascaderProps, BasicCascaderEmits, ModelValue } from "./type";

import { isFunction, isArray } from "lodash";
import { useAttrs, useSlots, computed, ref, watch } from "vue";

defineOptions({
  name: "BasicCascader",
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicCascaderProps>(), {
  clearable: true,
});

const emit = defineEmits<BasicCascaderEmits>();

const getBindValues = computed(() => ({
  ...attrs,
  clearable: props.clearable,
}));

const cascaderRef = ref();
const stateValue = ref<ModelValue>();
const cascaderDatas = ref<Recordable[]>([]);

const init = async () => {
  try {
    if (isArray(props.data)) {
      cascaderDatas.value = props.data;
      return;
    }

    if (isFunction(props.api)) {
      cascaderDatas.value = await props.api();
    }
  } catch (error) {
    console.error("BasicCascader init error:", error);
  }
};

init();

watch(
  () => props.modelValue,
  () => {
    stateValue.value = props.modelValue;
  },
  { immediate: true }
);

const emitChange = () => {
  emit("update:modelValue", stateValue.value);
  emit("change", {
    value: stateValue.value,
    node: cascaderRef.value.getCheckedNodes(),
  });
};
</script>
