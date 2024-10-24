import type { BasicTableProps } from './'
import type { ComputedRef } from 'vue'

export interface UseTableRadioSelectionReturn {
  getRadioSelectedRow: () => Recordable<any>
  cleanRadioSelectedRow: () => void
  handleRadioSelectionChange: (rows: Recordable<any>) => void
}

export interface UseTableRadioSelection {
  (getProps: ComputedRef<BasicTableProps>): UseTableRadioSelectionReturn
}
