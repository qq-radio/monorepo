<template>
  <BasicTable
    hasRadioSelection
    :radioSelectionColumnProps="{
      'class-name': 'custom-style',
      fixed: true,
    }"
    @register="registerTable"
    @row-click="handleRowClick"
  />
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema } from "@center/components";

import userListMockData from "@mocks/user-list.json";

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
    searchConfig: {
      label: "用户名",
      prop: "username",
      component: "input",
    },
  },
  {
    label: "手机号",
    prop: "phone",
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
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const userListApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: userListMockData.length,
        records: userListMockData,
      });
    }, 500);
  });
};

const [registerTable] = useTable({
  request: userListApi,
  schemas,
});

const handleRowClick = (row, column, event) => {
  console.log("表格单选 row:", row);
  console.log("表格单选 column:", column);
  console.log("表格单选 event:", event);
};
</script>

<style lang="scss">
.custom-style {
  background: pink !important;
}
</style>
