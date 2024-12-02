export * from "./src/types";

export { useForm } from "./src/hooks/useForm";

import BasicFormComponent from "./src/BasicForm.vue";

export type BasicFormInstance = InstanceType<typeof BasicFormComponent>;

export const BasicForm = BasicFormComponent;
