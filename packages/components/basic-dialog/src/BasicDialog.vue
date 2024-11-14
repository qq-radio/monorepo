<template>
  <el-dialog
    v-bind="getBindValues"
    v-model="dialogVisible"
    :class="ns.b()"
    :before-close="handleCancel"
  >
    <div
      :class="ns.e('content')"
      :style="{ maxHeight: getProps.height + 'px' }"
    >
      <slot />
    </div>
    <template v-if="getProps.hasFooter" #footer>
      <slot name="footer">
        <el-button @click="handleCancel">{{ getProps.cancelText }}</el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="
            getProps.hasDebounce ? handleDebounceConfirm() : handleConfirm()
          "
        >
          {{ getProps.confirmText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { BasicDialogProps, BasicDialogEmits, DialogMethods } from "./type";

import { useBasicNamespace } from "@center/composables";

import { ref, watchEffect, computed, useAttrs, onMounted, unref } from "vue";
import { debounce } from "lodash";

const ns = useBasicNamespace("dialog");

defineOptions({
  name: "BasicDialog",
});

const attrs = useAttrs();

const emit = defineEmits<BasicDialogEmits>();

const props = withDefaults(defineProps<BasicDialogProps>(), {
  title: "标题",
  width: "780px",
  height: 760,
  appendToBody: false,
  hasFooter: true,
  cancelText: "取消",
  confirmText: "确定",
});

const propsRef = ref<Partial<BasicDialogProps>>({});

const getProps = computed<BasicDialogProps>(() => {
  return { ...props, ...unref(propsRef) };
});

function setProps(partialProps: Partial<BasicDialogProps>) {
  propsRef.value = { ...unref(propsRef), ...partialProps };
}

const getBindValues = computed(() => ({
  ...attrs,
  ...getProps.value,
  title: dialogTitle.value,
}));

const dialogTitle = ref("");
const dialogVisible = ref(false);
const confirmLoading = ref(false);

watchEffect(() => {
  dialogTitle.value = props.title;
  dialogVisible.value = props.modelValue;
  confirmLoading.value = props.loading;
});

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const setDialogTitle = (value) => {
  dialogTitle.value = value;
};

const setConfirmLoading = (value) => {
  confirmLoading.value = value;
};

const handleConfirm = () => {
  if (confirmLoading.value) {
    return;
  }
  emit("confirm");
};

const handleDebounceConfirm = debounce(handleConfirm, 2000);

const handleCancel = () => {
  closeDialog();
  emit("update:modelValue", false);
  emit("cancel");
};

const dialogMethods: DialogMethods = {
  setProps,
  openDialog,
  closeDialog,
  setDialogTitle,
  setConfirmLoading,
};

onMounted(() => {
  emit("register", dialogMethods);
});

defineExpose({
  ...dialogMethods,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
