<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm
        v-model="formModel"
        :schemas="formSchemas"
        hasFooter
        hasClear
        @clear="handleClear"
        @reset="handleReset"
        @submit="handleSubmit"
      />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { BasicForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const activeNames = ref(["example"]);

const formModel = ref({});

const formSchemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",

    defaultValue: "李华",
  },
  {
    label: "运动",
    prop: "sport",
    component: "select",
    componentProps: {
      options: [
        { label: "足球", value: "football" },
        { label: "篮球", value: "basketball" },
        { label: "羽毛球", value: "badminton" },
      ],
    },
    defaultValue: "basketball",
  },
  {
    label: "入职日期",
    prop: "joinDay",
    component: "date-picker",
  },
];

const handleClear = () => {
  console.log("清空成功");
};

const handleReset = () => {
  console.log("重置成功");
};

const handleSubmit = () => {
  console.log("提交成功");
};
</script>
