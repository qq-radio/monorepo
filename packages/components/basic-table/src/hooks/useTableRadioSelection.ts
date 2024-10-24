import type { UseTableRadioSelection } from '../types'

import { ref, unref } from 'vue'

// 这个的思路不对 应该要放到 body去而不是table 之后要改 思路要模仿useformself
export const useTableRadioSelection: UseTableRadioSelection = () => {
  const selectedRow = ref<Recordable<any>>({})

  function getRadioSelectedRow() {
    return unref(selectedRow)
  }

  function cleanRadioSelectedRow() {
    selectedRow.value = {}
  }

  function handleRadioSelectionChange(row: Recordable<any>) {
    selectedRow.value = row
  }

  return {
    getRadioSelectedRow,
    cleanRadioSelectedRow,
    handleRadioSelectionChange
  }
}
