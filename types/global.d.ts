declare interface Recordable<T = any> {
  [key: string]: T;
}

declare type Nullable<T> = T | null;

type Arrayable<T> = T | T[];
