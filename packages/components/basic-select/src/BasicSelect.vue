<template>
  <el-select
    v-bind="getBindValues"
    v-model="stateValue"
    :class="ns.b()"
    @change="handleChange"
  >
    <el-checkbox
      v-if="hasCheckAll"
      v-model="isCheckAll"
      :class="ns.e('check-all')"
      :indeterminate="isIndeterminate"
      style=""
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <template v-for="(item, index) in stateOptions" :key="index">
      <el-option
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <component
          :is="item.customRender(getCallbackParams(item))"
          v-if="isFunction(item.customRender)"
        />
        <slot
          v-else-if="isString(item.customSlot)"
          :name="item.customSlot"
          v-bind="getCallbackParams(item)"
        />
        <component
          :is="render(getCallbackParams(item))"
          v-else-if="isFunction(render)"
        />
        <slot v-else-if="slots.default" v-bind="getCallbackParams(item)" />
        <span v-else>{{ item.label }}</span>
      </el-option>
    </template>
    <template v-for="name in inheritSlots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </el-select>
</template>

<script setup lang="ts">
import {
  BasicSelectProps,
  BasicSelectEmits,
  SelectOption,
  SelectValue,
  SelectCallbackParams,
} from "./type";

import { useOptionQuery, useBasicNamespace } from "@center/composables";

import { isFunction, isString } from "@center/utils";
import { useAttrs, useSlots, computed, onMounted, ref, watch } from "vue";
import { isEmpty } from "lodash";

const ns = useBasicNamespace("select");

defineOptions({
  name: "BasicSelect",
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();
const inheritSlots = Object.keys(slots).filter((k) => k !== "default");

const props = withDefaults(defineProps<BasicSelectProps>(), {
  clearable: true,
});

const emit = defineEmits<BasicSelectEmits>();

const getBindValues = computed(() => ({
  ...attrs,
  clearable: props.clearable,
  multiple: props.hasCheckAll || props.multiple,
}));

const isCheckAll = ref(false);
const isIndeterminate = ref(false);

const stateValue = ref<SelectValue>();

const {
  options: stateOptions,
  init,
  getAllValues,
  findOptions,
  findLabels,
  findOption,
} = useOptionQuery<SelectOption>(props);

onMounted(() => {
  init();
});

watch(
  () => props.modelValue,
  () => {
    stateValue.value = props.modelValue;
    if (isEmpty(stateValue.value)) {
      isCheckAll.value = false;
      isIndeterminate.value = false;
    }
  },
  { immediate: true }
);

const getCallbackParams = (item: SelectOption): SelectCallbackParams => ({
  labels: findLabels(stateValue.value),
  values: stateValue.value,
  option: item,
});

const handleCheckAllChange = (checkAll: boolean) => {
  stateValue.value = checkAll ? getAllValues() : [];
  isIndeterminate.value = false;
  emitChange();
};

const handleChange = (values: string[]) => {
  const checkedCount = values.length;
  isCheckAll.value = checkedCount === stateOptions.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < stateOptions.value.length;
  emitChange();
};

const emitChange = () => {
  emit("update:modelValue", stateValue.value);
  emit("change", {
    values: stateValue.value,
    labels: findLabels(stateValue.value),
    options: props.multiple
      ? findOptions(stateValue.value)
      : findOption(stateValue.value),
  });
};
</script>

<style scoped lang="scss">
@use "./style.scss";
</style>
