<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="tsx" setup>
import {
  BasicTable,
  useTable,
  TableSchema,
  OperationButton,
  ActionButton,
} from "@center/components";
import MockUserList from "../../mocks/user-list.json";
import MockDepartment from "../../mocks/department.json";

const operations: OperationButton[] = [
  {
    text: "新增",
    permission: true,
    onClick: () => {
      console.log("点击了新增");
    },
  },
  {
    text: "批量删除",
    permission: true,
    props: {
      type: "danger",
    },
    onConfirm: ({ row }) => {
      console.log("点击了批量删除");
    },
  },
];

const actions: ActionButton[] = [
  {
    text: "编辑",
    permission: true,
    onClick: () => {
      console.log("点击了编辑");
    },
  },
  {
    text: "删除",
    permission: true,
    onConfirm: ({ row }) => {
      console.log("点击了删除");
    },
  },
  {
    text: "详情",
    permission: true,
    onClick: ({ row }) => {
      console.log("点击了详情");
    },
  },
];

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
    searchConfig: {
      label: "部门",
      prop: "departmentId",
      component: "tree-select",
      componentProps: {
        data: MockDepartment,
        props: { value: "id", label: "name", children: "children" },
      },
      required: true,
    },
  },
  {
    label: "岗位",
    prop: "job",
    searchConfig: {
      label: "岗位",
      prop: "job",
      component: "select",
      componentProps: {
        options: [],
      },
    },
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
    searchConfig: {
      label: "状态",
      prop: "status",
      component: "select",
      componentProps: {
        options: [
          { label: "正常", value: 1 },
          { label: "异常", value: 0 },
        ],
      },
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
  operations,
  actions,
});
</script>
