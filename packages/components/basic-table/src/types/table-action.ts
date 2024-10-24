import type { TableSchema } from './'
import type { TableColumnCtx, ButtonProps, LinkProps } from 'element-plus'
import type { VNode } from 'vue'

export interface TableActionProps
  extends Pick<
    TableSchema,
    'label' | 'width' | 'fixed' | 'visible' | 'columnProps'
  > {
  type?: 'button' | 'link'
  showNumber?: number
  buttons: ActionButton[]
}

export interface ColumnParams {
  row: Recordable<any>
  rowIndex: number
  column: TableColumnCtx<any>
}

export interface TableActionCallbackParams extends ColumnParams {
  button: ActionButton
}

export interface RenderButton {
  (params: TableActionCallbackParams): VNode
}

export interface ActionButton {
  text: string | ((params: TableActionCallbackParams) => string)
  permission?: string
  show?: boolean | ((params: ColumnParams) => boolean)
  message?: string
  props?: Partial<ButtonProps & LinkProps>
  onClick?: (params: TableActionCallbackParams) => void
  onConfirm?: (params: TableActionCallbackParams) => void
  onCancel?: (params: TableActionCallbackParams) => void
}
