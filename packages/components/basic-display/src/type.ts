export type ElementPlusDisplayType = "link" | "tag" | "progress";

export type CustomDisplayType = "image" | "copy" | "status";

export type DisplayType = ElementPlusDisplayType | CustomDisplayType;

export interface DisplaySchema {
  type: DisplayType;
  [key: string]: any;
}

export interface BasicDisplayProps {
  type: DisplayType;
}
