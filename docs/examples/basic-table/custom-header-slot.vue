<template>
  我不知道为什么这个的search布局一直不对 应该是我还没有理解好布局 也没有设计好
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
    <template #header-status>
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

import userListMockData from "@mocks/user-list.json";

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
        total: userListMockData.length,
        records: userListMockData,
      });
    }, 500);
  });

  const result_2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: userListMockData.length,
        records: userListMockData.filter((u) => u.status === statusValue.value),
      });
    }, 500);
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
