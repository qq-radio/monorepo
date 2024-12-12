<template>
  <BasicButtonGroup :buttons="buttons" />
  <BasicTable @register="register" />
</template>

<script lang="ts" setup>
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
] = useTable({
  schemas,
  data: userListMockData,
  rowKey: "code",
  hasSelection: true,
  selectionColumnProps: {
    fixed: true,
    align: "center",
  },
});

const buttons: Button[] = [
  {
    text: "(多选)设置勾选项",
    onClick: () => {
      setRadioSelectedRow(userListMockData[2]);
      console.log("(多选)设置勾选项成功");
    },
  },
  {
    text: "(多选)获取勾选项",
    onClick: () => {
      console.log("(多选)获取勾选项", getRadioSelectedRow());
    },
  },
  {
    text: "(多选)清空勾选项",
    onClick: () => {
      clearRadioSelectedRow();
      console.log("(多选)清空勾选项成功");
    },
  },
];
</script>
