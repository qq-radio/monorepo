<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="tsx" setup>
import {
  BasicTable,
  useTable,
  TableSchema,
  BasicSelect,
} from "@center/components";
import { ElIcon } from "element-plus";
import { Hide, View } from "@element-plus/icons-vue";

import { h } from "vue";
import userListMockData from "@mocks/user-list.json";

const isHide = ref(false);

const toggleHide = () => {
  isHide.value = !isHide.value;
};

const hidePhohe = (value) => value.slice(0, 3) + "****" + value.slice(7);

const hideFullPhoneNumber = (value) => hidePhohe(value);

const statusValue = ref();

const statusOptions = [
  {
    type: "success",
    text: "在职中",
    value: 1,
  },
  {
    type: "danger",
    text: "已离职",
    value: 2,
  },
];

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
    // searchConfig: {
    //   label: "用户名",
    //   prop: "username",
    //   component: "input",
    // },
  },
  {
    label: "手机号",
    prop: "phone",
    customHeaderRender: ({ schema }) =>
      h("div", [
        schema.label,
        h(
          ElIcon,
          {
            style: {
              cursor: "pointer",
              marginLeft: "4px",
              verticalAlign: "middle",
            },
            onClick: toggleHide,
          },
          isHide.value ? h(Hide) : h(View)
        ),
      ]),
    customRender: ({ value }) =>
      isHide.value ? value : hideFullPhoneNumber(value),
    width: 120,
  },
  {
    label: "部门",
    prop: "departmentName",
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
    formatter: ({ value }) =>
      value === 1
        ? {
            type: "success",
            text: "在职中",
          }
        : {
            type: "danger",
            text: "已离职",
          },
    customHeaderRender: () =>
      h(BasicSelect, {
        modelValue: statusValue.value,
        options: statusOptions,
        labelField: "text",
        placeholder: "请选择状态",
        "onUpdate:modelValue": (value) => (statusValue.value = value),
        onChange: reQuery,
      }),
    width: 180,
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const userListApi = () => {
  const result_1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: userListMockData.length,
        records: userListMockData,
      });
    }, 1000);
  });

  const result_2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: userListMockData.length,
        records: userListMockData.filter((u) => u.status === statusValue.value),
      });
    }, 1000);
  });

  return statusValue.value ? result_2 : result_1;
};

const [registerTable, { reQuery }] = useTable({
  request: userListApi,
  schemas,
  actionColumnProps: {
    width: 280,
  },
});
</script>
