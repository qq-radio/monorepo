<template>
  <el-select
    :class="ns.b()"
    v-bind="getBindValues"
    v-model="stateValue"
    @change="handleChange"
  >
    <el-checkbox
      :class="ns.e('check-all')"
      v-if="hasCheckAll"
      v-model="isCheckAll"
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
      </el-option>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import {
  BasicSelectProps,
  BasicSelectEmits,
  SelectOption,
  ModelValue,
  SelectCallbackParams,
} from "./type";

import { useOptionQuery, useBasicNamespace } from "@center/composables";

import { isFunction, isString } from "@center/utils";
import { useAttrs, useSlots, computed, onMounted, ref, watch } from "vue";

import { BasicRender } from "@center/components/basic-render";

const ns = useBasicNamespace("select");

defineOptions({
  name: "BasicSelect",
});

const attrs = useAttrs();
const slots = useSlots();

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

const stateValue = ref<ModelValue>();

const {
  options: stateOptions,
  init,
  findLabels,
  getAllValues,
  findOptions,
} = useOptionQuery<SelectOption>(props);

onMounted(() => {
  init();
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      stateValue.value = props.modelValue;
    }
  },
  { immediate: true }
);

const getCallbackParams = (item: SelectOption): SelectCallbackParams => ({
  value: stateValue.value,
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
    options: findOptions(stateValue.value),
  });
};
</script>

<style lang="scss" scoped>
@use "./style.scss";
</style>
