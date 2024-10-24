import type { UseTable, BasicTableProps, TableMethods } from "../types";

import { ref, unref, watch, onUnmounted } from "vue";

export const useTable: UseTable = (props) => {
  const instanceRef = ref<Nullable<TableMethods>>(null);

  function getInstance() {
    const instance = unref(instanceRef);
    if (!instance) {
      const error =
        "The table instance has not been obtained, please make sure that the table has been rendered when performing the table operation";
      throw new Error(error);
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
    getRadioSelectedRow: () => {
      return getInstance().getRadioSelectedRow();
    },
    cleanRadioSelectedRow: () => {
      return getInstance().cleanRadioSelectedRow();
    },
  };

  return [register, methods];
};
