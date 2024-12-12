import type { ComputedRef } from "vue";

import { ref, computed, unref } from "vue";

import { ElMessage } from "element-plus";

type Props = ComputedRef<{
  rowKey: string;
}>;

export type UseTableSelectionReturn = ReturnType<typeof useTableSelection>;

// 这里要实现 set clear 我不会 o(╥﹏╥)o
export function useTableSelection(props: Props) {
  const selectedRows = ref<Array<Recordable>>([]);

  const selectedValues = computed<Array<number | string>>(() =>
    selectedRows.value.map((i) => i[props.value.rowKey])
  );

  function getSelectedValues() {
    return unref(selectedValues);
  }

  function getSelectedRows() {
    return unref(selectedRows);
  }

  function setSelectedRows(rows: Recordable[]) {
    selectedRows.value = rows;
  }

  function checkHasSelection() {
    return !!unref(selectedValues)?.length;
  }

  function validateHasSelection() {
    if (checkHasSelection()) {
      return;
    }

    const message = "请至少选择一条数据后再操作";
    ElMessage.warning(message);
  }

  return {
    getSelectedValues,
    getSelectedRows,
    setSelectedRows,
    checkHasSelection,
    validateHasSelection,
  };
}
