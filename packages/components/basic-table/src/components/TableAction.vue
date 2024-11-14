<template>
  <div class="actions" v-bind="getBindValues">
    <template v-for="(button, index) in preButtons" :key="index">
      <component :is="() => render(button)" />
    </template>
    <el-dropdown v-if="hasDropdown" trigger="click">
      <span style="color: #69a9ff">
        <span>更多</span>
        <el-icon><ArrowDownBold /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="button in dropdownButtons"
            :key="button.text"
          >
            <component :is="() => render(button)" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type {
  TableActionProps,
  TableActionCallbackParams,
  ActionButton,
  TableColumnParams,
} from "../types";

// import store from "@/store";
import { useAttrs, h, computed } from "vue";
import { isFunction, isUndefined, merge } from "lodash";

import { ElButton, ElIcon, ElLink, ElPopconfirm } from "element-plus";
import { ArrowDownBold } from "@element-plus/icons-vue";

defineOptions({
  name: "TableAction",
});

const attrs = useAttrs();

const props = withDefaults(defineProps<TableActionProps>(), {
  type: "link",
  showNumber: 4,
  buttons: () => [],
});

const getBindValues = computed(() => ({
  ...attrs,
  ...props,
}));

const params = computed<TableColumnParams>(() => {
  return {
    row: props.row,
    rowIndex: props.rowIndex,
    column: props.column,
  };
});

const checkHasPermission = (permission) => {
  // if (isUndefined(permission)) {
  //   return true;
  // }

  // const buttonPermissions = store.getters.permissions;

  // return buttonPermissions[permission];

  return true;
};

const checkHasShow = (show) => {
  if (isFunction(show)) {
    return show(params.value) !== false;
  }

  return show !== false;
};

const getButtons = computed(() =>
  props.buttons.filter(
    (item) => checkHasPermission(item.permission) && checkHasShow(item.show)
  )
);
const preButtons = computed(() => getButtons.value.slice(0, props.showNumber));
const hasDropdown = computed(() => getButtons.value.length > props.showNumber);
const dropdownButtons = computed(() =>
  hasDropdown.value ? getButtons.value.slice(props.showNumber) : []
);

const render = (button: ActionButton) => {
  const { row, column, rowIndex } = props;

  const callbackParams = computed<TableActionCallbackParams>(() => {
    return {
      ...params.value,
      button,
    };
  });

  const Tag = props.type === "button" ? ElButton : ElLink;

  const tagProps = merge({ type: "primary" }, button.props || {});

  const text = isFunction(button.text)
    ? button.text({ row, column, rowIndex, button })
    : button.text;

  const buttonComponent = h(
    Tag,
    {
      ...tagProps,
      size: "small",
      onClick: (event) => {
        event.stopPropagation();
        handleClick(callbackParams.value);
      },
    },
    text
  );

  if (isFunction(button.onConfirm)) {
    return h(
      ElPopconfirm,
      {
        title: button.message || `确认${text}吗？` || "确定执行此操作吗？",
        onConfirm: () => handleConfirm(callbackParams.value),
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
          handleClick(callbackParams.value);
        },
      },
      {
        reference: () => buttonComponent,
      }
    );
  }

  return buttonComponent;
};

const handleClick = (params: TableActionCallbackParams) => {
  const { button: { onClick } = {} } = params;

  if (onClick && isFunction(onClick)) {
    onClick(params);
  }
};

const handleConfirm = (params: TableActionCallbackParams) => {
  const { button: { onConfirm } = {} } = params;

  if (onConfirm && isFunction(onConfirm)) {
    onConfirm(params);
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
