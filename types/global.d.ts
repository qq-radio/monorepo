import type { VNode } from "vue";

declare interface Recordable<T = unknown> {
  [key: string]: T;
}

declare type Nullable<T> = T | null;

declare type Arrayable<T> = T | T[];

declare type Render = () => VNode;
