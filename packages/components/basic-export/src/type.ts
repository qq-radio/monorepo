export type Params = Recordable | (() => Recordable<any>)

export interface ExportConfig {
  url: string
  params: Params
  beforeExport?: (params: Recordable) => boolean
  fileName?: string
}

export interface BasicExportProps {
  config: ExportConfig
}

export interface BasicExportEmits {
  (e: 'success'): void
  (e: 'fail'): void
  (e: 'complete'): void
}
