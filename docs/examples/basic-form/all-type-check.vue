<template>
  先举出一个反例，当componentprops是个函数的时候，会导致normalize是不正常的
  如果是个函数，不正常后

  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm v-model="formModel" :schemas="formSchemas" hasFooter />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx" setup>
import { BasicForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const activeNames = ref(["example"]);

const formModel = ref({});

const formSchemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    component: "select",
    componentProps: () => {},
    required: true,
  },
  {
    label: "礼物",
    prop: "gift",
    component: "textarea",
    componentProps: () => ({}),
    required: true,
    max: 10,
  },
];
</script>
