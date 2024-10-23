<template>
  <BasicForm
    v-model="model"
    @submit="submit"
    @register="registerForm"
    hasFooter
  >
    <template #basic-info="{ schema }">
      <div
        style="
          color: #0072ff;
          border-bottom: 2px solid #d7d5dd;
          padding: 10px;
          margin-bottom: 20px;
        "
      >
        <el-icon style="margin-right: 6px">
          <Grape />
        </el-icon>
        {{ schema.title }}
      </div>
    </template>
    <template #favorite-fruit="{ model }">
      <div
        style="
          color: #0072ff;
          border-bottom: 2px solid #d7d5dd;
          padding: 10px;
          margin-bottom: 20px;
        "
      >
        <el-icon style="margin-right: 6px">
          <Grape />
        </el-icon>
        您好{{ model.username }}，请选择您喜欢的水果
      </div>
    </template>
  </BasicForm>
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";
import { Grape } from "@element-plus/icons-vue";

import { ref } from "vue";

const model = ref({});

const schemas: FormSchema[] = [
  {
    title: "基本信息",
    customTitleSlot: "basic-info",
  },
  {
    label: "用户",
    prop: "username",
    component: "input",
    required: true,
  },
  {
    label: "年龄",
    prop: "age",
    component: "input-number",
    required: true,
  },
  {
    title: "喜好",
    customTitleSlot: "favorite-fruit",
  },
  {
    label: "水果",
    prop: "fruit",
    component: "checkbox",
    componentProps: {
      options: [
        { label: "葡萄", value: "grape" },
        { label: "苹果", value: "apple" },
        { label: "橘子", value: "orange" },
      ],
    },
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
});

const submit = (values) => {
  console.log("表单提交值:", values);
};
</script>
