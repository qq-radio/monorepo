<template>
  <el-checkbox-group
    v-bind="getBindValues"
    v-model="stateLabel"
    @change="onChange"
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
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import {
  BasicCheckboxGroupProps,
  BasicCheckboxGroupEmits,
  CheckboxOption,
  ModelValue,
} from "./type";

import { useOptionQuery } from "@center/composables";

import { isFunction, isString } from "@center/utils";
import { useAttrs, useSlots, computed, onMounted, ref, watch } from "vue";

import { BasicRender } from "@center/components/basic-render";

defineOptions({
  name: "BasicCheckboxGroup",
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<BasicCheckboxGroupProps>(), {});

const emit = defineEmits<BasicCheckboxGroupEmits>();

const getBindValues = computed(() => ({
  ...attrs,
}));

const stateLabel = ref<string[]>();
const stateValue = ref<(string | number)[]>([]);

const {
  options: stateOptions,
  init,
  filterOptionsByValue,
  findLabels,
  findValues,
} = useOptionQuery(props);

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

const getComponent = (isButton: boolean) =>
  isButton || props.isButton ? "el-checkbox-button" : "el-checkbox";

const getCallbackParams = (item: CheckboxOption) => ({
  value: stateValue.value,
  option: item,
});

const onChange = () => {
  stateValue.value = findValues(stateLabel.value);

  emit("update:modelValue", stateValue.value);
  emit("change", {
    values: stateValue.value,
    labels: stateLabel.value,
    options: filterOptionsByValue(stateValue.value),
  });
};
</script>
