<template>
  <el-checkbox
    v-if="hasCheckAll"
    v-model="isCheckAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
  <el-checkbox-group
    v-bind="getBindValues"
    v-model="stateLabel"
    @change="handleCheckChange"
  >
    <template v-for="(item, index) in stateOptions" :key="index">
      <component
        :is="getComponent(item.isButton)"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :border="item.border"
        :size="item.size"
      >
        <component
          :is="
            renderItem(item, {
              fallbackContent: item.label,
              callbackParams: getCallbackParams(item),
            })
          "
        />
      </component>
    </template>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import {
  BasicCheckboxGroupProps,
  BasicCheckboxGroupEmits,
  CheckboxOption,
  CheckboxCallbackParams,
} from "./type";

import { useOptionQuery, useCustomRender } from "@center/composables";

import { useAttrs, useSlots, computed, onMounted, ref, watch } from "vue";

defineOptions({
  name: "BasicCheckboxGroup",
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicCheckboxGroupProps>(), {});

const emit = defineEmits<BasicCheckboxGroupEmits>();

const getBindValues = computed(() => ({
  ...attrs,
}));

const isCheckAll = ref(false);
const isIndeterminate = ref(false);

const stateLabel = ref<string[]>();
const stateValue = ref<(string | number)[]>([]);

const {
  options: stateOptions,
  init,
  findOptions,
  findLabels,
  findValues,
} = useOptionQuery<CheckboxOption>(props);

const { renderItem } = useCustomRender({
  render: props.render,
  slots,
});

onMounted(() => {
  init();
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      stateValue.value = props.modelValue;
      stateLabel.value = findLabels(props.modelValue);
    }
  },
  { immediate: true }
);

const getComponent = (isButton?: boolean) =>
  isButton || props.isButton ? "el-checkbox-button" : "el-checkbox";

const getCallbackParams = (item: CheckboxOption): CheckboxCallbackParams => ({
  value: stateValue.value,
  option: item,
});

const getAllLabels = () => stateOptions.value.map((i) => i.label) || [];

const handleCheckAllChange = (checkAll: boolean) => {
  stateLabel.value = checkAll ? getAllLabels() : [];
  isIndeterminate.value = false;

  emitChange();
};

const handleCheckChange = (values: string[]) => {
  const checkedCount = values.length;
  isCheckAll.value = checkedCount === stateOptions.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < stateOptions.value.length;

  emitChange();
};

const emitChange = () => {
  stateValue.value = findValues(stateLabel.value);
  emit("update:modelValue", stateValue.value);
  emit("change", {
    values: stateValue.value,
    labels: stateLabel.value,
    options: findOptions(stateValue.value),
  });
};
</script>
