import type { BasicTableProps, TableMethods } from "../types";

import { ErrorMessages, BasicComponentError } from "@center/components/error";

import { ref, unref, watch, onUnmounted } from "vue";

type Props = Partial<BasicTableProps>;

export type UseTableReturn = [(instance: TableMethods) => void, TableMethods];

export const useTable = (props?: Props): UseTableReturn => {
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
    getTableDatas: () => {
      return getInstance().getTableDatas();
    },
    getSearchParams: () => {
      return getInstance().getSearchParams();
    },
    getRequestParams: () => {
      return getInstance().getRequestParams();
    },
    reQuery: () => {
      getInstance().reQuery();
    },

    // useTableRadioSelection
    getRadioSelectedValue: () => {
      return getInstance().getRadioSelectedValue();
    },
    setRadioSelectedValue: (value) => {
      return getInstance().setRadioSelectedValue(value);
    },
    getRadioSelectedRow: () => {
      return getInstance().getRadioSelectedRow();
    },
    setRadioSelectedRow: (value) => {
      return getInstance().setRadioSelectedRow(value);
    },
    clearRadioSelected: () => {
      return getInstance().clearRadioSelected();
    },
    checkHasRadioSelection: () => {
      return getInstance().checkHasRadioSelection();
    },
    validateHasRadioSelection: () => {
      return getInstance().validateHasRadioSelection();
    },

    // useTableSelection
    getSelectedValues: () => {
      return getInstance().getSelectedValues();
    },
    getSelectedRows: () => {
      return getInstance().getSelectedRows();
    },
    checkHasSelection: () => {
      return getInstance().checkHasSelection();
    },
    validateHasSelection: () => {
      return getInstance().validateHasSelection();
    },
  };

  return [register, methods];
};
