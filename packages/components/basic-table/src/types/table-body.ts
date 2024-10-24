import type { BasicTableProps } from './'

export type TableBodyProps = Pick<
  BasicTableProps,
  | 'schemas'
  | 'datas'
  | 'loading'
  | 'hasRadioSelection'
  | 'radioSelectionKey'
  | 'hasSelection'
  | 'selectionColumnProps'
  | 'hasIndex'
  | 'indexColumnProps'
  | 'hasExpand'
  | 'expandColumnProps'
  | 'hasAction'
  | 'actionColumnProps'
  | 'actions'
> & { columnWidth?: number }
