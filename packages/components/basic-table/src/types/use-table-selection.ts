import type { BasicTableProps } from './'
import type { ComputedRef, Slots } from 'vue'

export interface UseTableSelectionReturn {
  getSelectedRows: () => Array<Recordable>
  getSelectedIds: () => Array<number | string>
  checkHasSelection: () => boolean
  handleSelectionChange: (rows: Array<Recordable<any>>) => void
  validateHasSelection: () => void
}

export interface UseTableSelection {
  (
    getProps: ComputedRef<BasicTableProps>,
    context: {
      slots: Slots
    }
  ): UseTableSelectionReturn
}
