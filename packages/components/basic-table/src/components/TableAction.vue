<template>
  <el-table-column v-bind="getBindValues">
    <template #default="{ row, $index, column }">
      <div class="actions">
        <template
          v-for="button in getButtons({ row, rowIndex: $index, column })
            .preButtons"
          :key="button.text"
        >
          <component
            :is="() => render({ row, rowIndex: $index, column, button })"
          />
        </template>
        <el-dropdown
          v-if="getButtons({ row, rowIndex: $index, column }).hasDropdown"
          trigger="click"
        >
          <span style="color: #69a9ff">
            <span>更多</span>
            <el-icon><ArrowDownBold /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="button in getButtons({
                  row,
                  rowIndex: $index,
                  column,
                }).dropdownButtons"
                :key="button.text"
              >
                <component
                  :is="() => render({ row, rowIndex: $index, column, button })"
                />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type {
  TableActionProps,
  ColumnParams,
  TableActionCallbackParams,
  RenderButton,
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
  label: "操作",
  fixed: "right",
  type: "link",
  width: 160,
  showNumber: 4,
  buttons: () => [],
});

const getBindValues = computed(() => ({
  ...attrs,
  ...props,
}));

const checkHasPermission = (permission) => {
  // if (isUndefined(permission)) {
  //   return true;
  // }

  // const buttonPermissions = store.getters.permissions;

  // return buttonPermissions[permission];
  return true;
};

const checkHasShow = (show, params) => {
  if (isFunction(show)) {
    return show(params) !== false;
  }

  return show !== false;
};

const getButtons = (params: ColumnParams) => {
  const { buttons, showNumber } = props;

  const allButtons = buttons.filter(
    (item) =>
      checkHasPermission(item.permission) && checkHasShow(item.show, params)
  );

  const preButtons = allButtons.slice(0, showNumber);
  const hasDropdown = allButtons.length > showNumber;
  const dropdownButtons = hasDropdown ? allButtons.slice(showNumber) : [];

  return {
    preButtons,
    hasDropdown,
    dropdownButtons,
  };
};

const render: RenderButton = (params) => {
  const { row, column, rowIndex, button } = params;

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
        handleClick(params);
      },
    },
    text
  );

  if (isFunction(button.onConfirm)) {
    return h(
      ElPopconfirm,
      {
        title: button.message || `确认${text}吗？` || "确定执行此操作吗？",
        onConfirm: () => handleConfirm(params),
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
          handleClick(params);
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
