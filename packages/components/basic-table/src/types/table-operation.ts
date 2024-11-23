import type {
  TemplateConfig,
  UploadConfig,
  ImportConfig,
} from "@center/components/basic-import";
import type { ExportConfig } from "@center/components/basic-export";
import type { ComputedRef } from "vue";

export interface TableOperationProps {
  buttons: OperationButton[];
}

export interface TableOperationEmits {
  (e: "success"): void;
}

export type OperationButton = DefaultButton | ImportButton | ExportButton;

interface OperationButtonBase {
  text: string | (() => string);
  permission?: string;
  show?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean) | ComputedRef<boolean>;
  onClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DefaultButton extends OperationButtonBase {
  type?: "default";
  props?: Recordable;
}

interface ImportButton extends OperationButtonBase {
  type: "import";
  props: {
    templateConfig: TemplateConfig;
    uploadConfig: UploadConfig;
    importConfig: ImportConfig;
  };
}

interface ExportButton extends OperationButtonBase {
  type: "export";
  props: {
    config: ExportConfig;
  };
}
