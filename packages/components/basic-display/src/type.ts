export type DisplayType =
  | 'image'
  | 'link'
  | 'tag'
  | 'progress'
  | 'copy'
  | 'status'

export interface BasicDisplayProps {
  type: DisplayType
  value: any
  customProps?: Recordable
}
