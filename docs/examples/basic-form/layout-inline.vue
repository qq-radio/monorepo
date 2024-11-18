<template>
  <BasicForm @submit="handleSubmit" @register="registerForm" hasFooter />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

const schemas: FormSchema[] = [
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
    label: "手机",
    prop: "phone",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "苹果", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
  },
  {
    label: "水果",
    prop: "fruit",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "葡萄", value: "grape" },
        { label: "苹果", value: "apple" },
        { label: "橘子", value: "orange" },
      ],
    },
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
  },
  {
    label: "绩效评分",
    prop: "score",
    component: "rate",
    required: true,
  },
  {
    label: "技能分",
    prop: "skill",
    component: "slider",
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "80px",
  colProps: {
    span: 8,
  },
});

const handleSubmit = () => {};
</script>
