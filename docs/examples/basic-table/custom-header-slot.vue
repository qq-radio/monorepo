<template>
  <BasicTable @register="registerTable">
    <template #header-phone="{ schema }">
      <div>
        {{ schema.label }}
        <el-icon style="cursor: pointer" @click="toggleHide">
          <Hide v-if="isHide" /><View v-else />
        </el-icon>
      </div>
    </template>
    <template #phone="{ value }">
      {{ isHide ? value : hideFullPhoneNumber(value) }}
    </template>
    <template #header-status="schema">
      <BasicSelect
        v-model="statusValue"
        :options="statusOptions"
        v-bind="{
          labelField: 'text',
          placeholder: '请选择状态',
        }"
        @change="reQuery"
      />
    </template>
  </BasicTable>
</template>

<script lang="tsx" setup>
import {
  BasicTable,
  useTable,
  TableSchema,
  Button,
  BasicSelect,
} from "@center/components";

import MockUserList from "../../mocks/user-list.json";

import { Hide, View } from "@element-plus/icons-vue";

const isHide = ref(false);

const toggleHide = () => {
  isHide.value = !isHide.value;
};

const hidePhohe = (value) => value.slice(0, 3) + "****" + value.slice(7);

const hideFullPhoneNumber = computed(() => (value) => hidePhohe(value));

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

const operations: Button[] = [
  {
    text: "新增",
    onClick: () => {
      console.log("点击了新增");
    },
  },
  {
    text: "批量启用",
    onConfirm: () => {
      console.log("点击了批量启用");
    },
  },
  {
    text: "批量禁用",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了批量禁用");
    },
  },
  {
    text: "批量删除",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了批量删除");
    },
  },
];

const actions: Button[] = [
  {
    text: "编辑",
    onClick: () => {
      console.log("点击了编辑");
    },
  },
  {
    text: "启用",
    onConfirm: () => {
      console.log("点击了启用");
    },
  },
  {
    text: "禁用",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了禁用");
    },
  },
  {
    text: "删除",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了删除");
    },
  },
  {
    text: "复制",
    onClick: () => {
      console.log("点击了复制");
    },
  },
  {
    text: "查看详情",
    onClick: () => {
      console.log("点击了查看详情");
    },
  },
  {
    text: "查看明细",
    onClick: () => {
      console.log("点击了查看明细");
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
    customHeaderSlot: "header-phone",
    customSlot: "phone",
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
    customHeaderSlot: "header-status",
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
        total: MockUserList.length,
        records: MockUserList,
      });
    }, 1000);
  });

  const result_2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: MockUserList.length,
        records: MockUserList.filter((u) => u.status === statusValue.value),
      });
    }, 1000);
  });

  return statusValue.value ? result_2 : result_1;
};

const [registerTable, { reQuery }] = useTable({
  request: userListApi,
  schemas,
  operations,
  actions,
  actionColumnProps: {
    width: 280,
  },
});
</script>
