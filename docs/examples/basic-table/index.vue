<template>
  我现在希望在这里测试 没事的 累了就休息 不要伤害自己 不要伤害我
  <BasicTable
    @register="registerTable"
    hasRadioSelection
    hasSelection
    hasIndex
    hasExpand
    :indexColumnProps="{
      align: 'center',
    }"
  />
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema } from "@center/components";

import MockUserList from "../../mocks/user-list.json";

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
    formatter: ({ value }) => value.slice(0, 3) + "****" + value.slice(7),
  },
  {
    label: "部门",
    prop: "departmentName",
    formatter: ({ row }) =>
      `${row.departmentLevelOneName}/${row.departmentLevelTwoName}/${row.departmentLevelThreeName}/${row.departmentName}`,
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
        total: MockUserList.length,
        records: MockUserList,
      });
    }, 1000);
  });
};

const [registerTable] = useTable({
  request: userListApi,
  schemas,
});
</script>

<style lang="scss">
.c-header {
  background-color: pink;
}
</style>
