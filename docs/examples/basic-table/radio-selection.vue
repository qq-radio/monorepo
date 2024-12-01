<template>
  <BasicButtonGroup :buttons="buttons" />
  <BasicTable
    :data="userListMockData"
    :schemas="schemas"
    rowKey="code"
    hasRadioSelection
    :radioSelectionColumnProps="{
      fixed: true,
      align: 'center',
    }"
    @register="register"
  />
</template>

<script lang="tsx" setup>
import {
  BasicTable,
  useTable,
  TableSchema,
  BasicButtonGroup,
  Button,
} from "@center/components";

import userListMockData from "@mocks/user-list.json";

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
  },
  {
    label: "手机号",
    prop: "phone",
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
    displayProps: ({ value }) => ({
      text: value === 1 ? "在职中" : "已离职",
      type: value === 1 ? "success" : "danger",
    }),
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const [
  register,
  { setRadioSelectedRow, getRadioSelectedRow, clearRadioSelectedRow },
] = useTable();

const buttons: Button[] = [
  {
    text: "设置勾选项",
    onClick: () => {
      setRadioSelectedRow(userListMockData[2]);
      console.log("设置勾选项成功");
    },
  },
  {
    text: "获取勾选项",
    onClick: () => {
      console.log("获取勾选项", getRadioSelectedRow());
    },
  },
  {
    text: "清空勾选项",
    onClick: () => {
      clearRadioSelectedRow();
      console.log("清空勾选项成功");
    },
  },
];
</script>
