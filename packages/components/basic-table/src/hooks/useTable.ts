import type { BasicTableProps, TableMethods } from "../types";

import { ErrorMessages, BasicComponentError } from "@center/components/error";

import { ref, unref, watch, onUnmounted } from "vue";

type Props = Partial<BasicTableProps>;

export type UseTableReturn = [(instance: TableMethods) => void, TableMethods];

export const useTable = (props: Props) => {
  const instanceRef = ref<Nullable<TableMethods>>(null);

  function getInstance() {
    const instance = unref(instanceRef);
    if (!instance) {
      throw new BasicComponentError(ErrorMessages.TABLE_INSTANCE_NOT_OBTAINED);
    }
    return instance;
  }

  function register(instance: TableMethods) {
    onUnmounted(() => {
      instanceRef.value = null;
    });

    instanceRef.value = instance;

    watch(
      () => props,
      () => {
        const propsValue = unref(props);
        if (propsValue) {
          getInstance().setProps(propsValue);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods: TableMethods = {
    setProps: (props: Partial<BasicTableProps>) => {
      getInstance().setProps(props);
    },

    // useTableData
    reQuery: () => {
      getInstance().reQuery();
    },
    getRequestParams: () => {
      return getInstance().getRequestParams();
    },

    // useTableSelection
    getSelectedRows: () => {
      return getInstance().getSelectedRows();
    },
    getSelectedIds: () => {
      return getInstance().getSelectedIds();
    },
    checkHasSelection: () => {
      return getInstance().checkHasSelection();
    },
    validateHasSelection: () => {
      return getInstance().validateHasSelection();
    },

    // useTableRadioSelection
    setRadioSelectedRow: (value) => {
      return getInstance().setRadioSelectedRow(value);
    },
    getRadioSelectedRow: () => {
      return getInstance().getRadioSelectedRow();
    },
    clearRadioSelectedRow: () => {
      return getInstance().clearRadioSelectedRow();
    },
  };

  return [register, methods];
};
