import type { VNode } from "vue";

declare global {
  declare interface Recordable<T = any> {
    [key: string]: T;
  }

  declare type Nullable<T> = T | null;

  declare type Arrayable<T> = T | T[];

  declare type Render = (params: any) => VNode;

  declare type MakeRequired<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

  declare type PartialRequired<T, K extends keyof T> = Partial<T> &
    Required<Pick<T, K>>;
}
