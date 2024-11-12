import type { UseTableSpecialColumn } from "../types";
import type { ConfirmType } from "@center/components/basic-button-group";

import { computed } from "vue";

export const useTableSpecialColumn: UseTableSpecialColumn = (getProps) => {
  const getRadioSelectionColumnProps = computed(() => ({
    key: "radio-selection",
    align: "center",
    width: 50,
    ...getProps.value.radioSelectionColumnProps,
  }));

  const getSelectionColumnProps = computed(() => ({
    key: "selection",
    type: "selection",
    align: "center",
    width: 50,
    ...getProps.value.selectionColumnProps,
  }));

  const getIndexColumnProps = computed(() => ({
    key: "index",
    type: "index",
    label: "序号",
    width: "60",
    ...getProps.value.indexColumnProps,
  }));

  const getExpandColumnProps = computed(() => ({
    key: "expand",
    label: "展开",
    width: "300",
    type: "expand",
    ...getProps.value.expandColumnProps,
  }));

  const getActionColumnProps = computed(() => ({
    key: "action",
    label: "操作",
    fixed: "right",
    width: 160,
    ...getProps.value.actionColumnProps,
  }));

  const confirmType: ConfirmType = "pop-confirm";

  const getActionProps = computed(() => ({
    confirmType,
    showNumber: 4,
    buttonProps: {
      link: true,
      type: "primary",
    },
    ...getProps.value.actionProps,
  }));

  return {
    getRadioSelectionColumnProps,
    getSelectionColumnProps,
    getIndexColumnProps,
    getExpandColumnProps,
    getActionColumnProps,
    getActionProps,
  };
};
