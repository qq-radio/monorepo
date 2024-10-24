import type { TableSchema } from './'
import type { TableColumnCtx } from 'element-plus'

export interface TableColumnProps {
  row: Recordable<any>
  rowIndex: number
  column: TableColumnCtx<any>
  schema: TableSchema
}

export interface TableColumnCallbackParams extends TableColumnProps {
  value: any
}
