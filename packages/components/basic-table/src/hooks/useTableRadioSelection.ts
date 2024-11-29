import type { UseTableRadioSelection } from "../types";

import { ref, unref } from "vue";

export const useTableRadioSelection: UseTableRadioSelection = () => {
  const radioSelectedRow = ref<Recordable>({});

  function handleRadioSelectionChange(row: Recordable) {
    radioSelectedRow.value = row;
  }

  function setRadioSelectedRow(row: Recordable) {
    console.log("setRadioSelectedRow:  这里会被调用，才是对的 之类", row);
    radioSelectedRow.value = row;
  }

  function getRadioSelectedRow() {
    return unref(radioSelectedRow);
  }

  function clearRadioSelectedRow() {
    radioSelectedRow.value = {};
  }

  return {
    radioSelectedRow,
    handleRadioSelectionChange,
    setRadioSelectedRow,
    getRadioSelectedRow,
    clearRadioSelectedRow,
  };
};
