export interface BasicDialogProps {
  modelValue?: boolean
  title?: string
  width?: string | number
  height?: string | number
  appendToBody?: boolean
  loading?: boolean
  hasFooter?: boolean
  hasDebounce?: boolean
  cancelText?: string
  confirmText?: string
}

export interface BasicDialogEmits {
  (e: 'register', methods: DialogMethods): void
  (e: 'update:modelValue', visible: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}

export interface DialogMethods {
  setProps: (props: Partial<BasicDialogProps>) => void
  openDialog: () => void
  closeDialog: () => void
  setDialogTitle: (value: string) => void
  setConfirmLoading: (loading: boolean) => void
}

type UseDialogReturn = [(instance: DialogMethods) => void, DialogMethods]

export interface UseDialog {
  (props?: Partial<BasicDialogProps>): UseDialogReturn
}
