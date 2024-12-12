<template>
  <BasicButtonGroup :buttons="buttons" />
  <BasicTable @register="register" />
</template>

<script setup lang="ts">
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
  {
    getRadioSelectedValue,
    setRadioSelectedValue,
    getRadioSelectedRow,
    setRadioSelectedRow,
    clearRadioSelected,
  },
] = useTable({
  schemas,
  data: userListMockData,
  rowKey: "code",
  hasRadioSelection: true,
  radioSelectionColumnProps: {
    fixed: true,
    align: "center",
  },
});

const buttons: Button[] = [
  {
    text: "getRadioSelectedValue",
    onClick: () => {
      const value = getRadioSelectedValue();
      console.log("(单选)获取勾选值", value);
    },
  },
  {
    text: "setRadioSelectedValue",
    onClick: () => {
      setRadioSelectedValue(userListMockData[1].code);
      console.log("(单选)设置勾选值成功");
    },
  },
  {
    text: "getRadioSelectedRow",
    onClick: () => {
      const row = getRadioSelectedRow();
      console.log("(单选)获取勾选项", row);
    },
  },
  {
    text: "setRadioSelectedRow",
    onClick: () => {
      setRadioSelectedRow(userListMockData[2]);
      console.log("(单选)设置勾选项成功");
    },
  },
  {
    text: "clearRadioSelected",
    onClick: () => {
      clearRadioSelected();
      console.log("(单选)设置勾选成功");
    },
  },
];
</script>
