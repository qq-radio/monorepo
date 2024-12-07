declare interface Recordable<T = any> {
  [key: string]: T;
}

declare type Nullable<T> = T | null;

declare type Arrayable<T> = T | T[];
