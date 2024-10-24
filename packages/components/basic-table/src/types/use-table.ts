import type {
  BasicTableProps,
  UseTableDataReturn,
  UseTableSelectionReturn,
  UseTableRadioSelectionReturn
} from './'

export interface TableMethods
  extends Pick<UseTableDataReturn, 'reQuery' | 'getRequestParams'>,
    Pick<
      UseTableSelectionReturn,
      | 'getSelectedRows'
      | 'getSelectedIds'
      | 'checkHasSelection'
      | 'validateHasSelection'
    >,
    Pick<
      UseTableRadioSelectionReturn,
      'getRadioSelectedRow' | 'cleanRadioSelectedRow'
    > {
  setProps: (props: Partial<BasicTableProps>) => void
}

type UseTableReturn = [(instance: TableMethods) => void, TableMethods]

export interface UseTable {
  (props?: Partial<BasicTableProps>): UseTableReturn
}
