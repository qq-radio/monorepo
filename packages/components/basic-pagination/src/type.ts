export interface BasicPaginationProps {
  modelValue?: Page
}

export interface BasicPaginationEmits {
  (e: 'update:modelValue', page: Page): void
  (e: 'change', page: Page): void
}

export interface Page {
  currentPage: number
  pageSize: number
  total: number
}
