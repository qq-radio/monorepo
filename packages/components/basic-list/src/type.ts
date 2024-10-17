export type StatusType = "primary" | "success" | "info" | "warning" | "danger";

export interface SingleStatusProps {
  content?: string;
  type?: StatusType;
  color?: string;
}

export interface BasicListProps extends SingleStatusProps {
  contents?: SingleStatusProps[];
}
