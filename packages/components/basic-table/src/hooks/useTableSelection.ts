import type { UseTableSelection } from "../types";

import { ref, computed, unref } from "vue";
import { ElMessage } from "element-plus";

export const useTableSelection: UseTableSelection = () => {
  const selectedRows = ref<Array<Recordable>>([]);

  const selectedIds = computed<Array<number | string>>(() =>
    selectedRows.value.map((i) => i.id)
  );

  function getSelectedRows() {
    return unref(selectedRows);
  }

  function getSelectedIds() {
    return unref(selectedIds);
  }

  function handleSelectionChange(rows: Recordable[]) {
    selectedRows.value = rows;
  }

  function checkHasSelection() {
    return !!unref(selectedIds)?.length;
  }

  function validateHasSelection() {
    if (selectedRows.value.length) {
      return;
    }

    const message = "请至少选择一条数据后再操作";
    ElMessage.warning(message);
    throw new Error(message);
  }

  return {
    getSelectedRows,
    getSelectedIds,
    checkHasSelection,
    handleSelectionChange,
    validateHasSelection,
  };
};
