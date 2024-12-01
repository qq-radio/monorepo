import type { BasicTableProps } from "../types";

import { ref, unref } from "vue";

type RadioValue = string | number | boolean;

type Props = Pick<BasicTableProps, "rowKey" | "hasRadioSelection">;

export type UseTableRadioSelectionReturn = ReturnType<
  typeof useTableRadioSelection
>;

export function useTableRadioSelection(props: Props) {
  const radioSelectedValue = ref<RadioValue>();

  function setRadioSelectedValue(value: RadioValue) {
    radioSelectedValue.value = value;
  }

  function clearRadioSelectedValue() {
    radioSelectedValue.value = undefined;
  }

  const radioSelectedRow = ref<Recordable>({});

  function handleRadioSelectionChange(row: Recordable) {
    if (!props.hasRadioSelection) {
      return;
    }
    radioSelectedRow.value = row;
    setRadioSelectedValue(row[props.rowKey]);
  }

  function setRadioSelectedRow(row: Recordable) {
    radioSelectedRow.value = row;
    setRadioSelectedValue(row[props.rowKey]);
  }

  function getRadioSelectedRow() {
    return unref(radioSelectedRow);
  }

  function clearRadioSelectedRow() {
    radioSelectedRow.value = {};
    clearRadioSelectedValue();
  }

  return {
    radioSelectedValue,
    radioSelectedRow,
    handleRadioSelectionChange,
    setRadioSelectedRow,
    getRadioSelectedRow,
    clearRadioSelectedRow,
  };
}
