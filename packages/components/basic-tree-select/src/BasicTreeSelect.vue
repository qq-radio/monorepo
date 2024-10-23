<template>
  <el-tree-select
    v-bind="getBindValues"
    v-model="stateValue"
    :data="treeDatas"
    @change="emitChange"
  >
    <template v-for="(_, key) in slots" :key="key" #[key]="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </el-tree-select>
</template>

<script lang="ts" setup>
import { BasicTreeSelectProps, BasicTreeSelectEmits, ModelValue } from "./type";

import { isFunction, isArray } from "lodash";
import { useAttrs, useSlots, computed, ref, watch } from "vue";

defineOptions({
  name: "BasicTreeSelect",
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicTreeSelectProps>(), {
  clearable: true,
});

const emit = defineEmits<BasicTreeSelectEmits>();

const getBindValues = computed(() => ({
  ...attrs,
  clearable: props.clearable,
}));

const stateValue = ref<ModelValue>("");
const treeDatas = ref<Recordable[]>([]);

const init = async () => {
  try {
    if (isArray(props.data)) {
      treeDatas.value = props.data;
      return;
    }

    if (isFunction(props.api)) {
      treeDatas.value = await props.api();
    }
  } catch (error) {
    console.error("BasicTreeSelect init error:", error);
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
  console.log("emitChange : 树的这里触发了吗？？？ ", stateValue.value);
  emit("update:modelValue", stateValue.value);
  emit("change", {
    value: stateValue.value,
  });
};
</script>
