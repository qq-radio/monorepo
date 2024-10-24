<template>
  <BasicForm
    v-model="model"
    @submit="submit"
    @register="registerForm"
    hasFooter
  />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const model = ref({});

const schemas: FormSchema[] = [
  {
    title: "基本信息",
    titleTooltip: "数据仅用于会员套餐定制，不会透露您的隐私，请放心填写",
  },
  {
    label: "用户",
    prop: "username",
    component: "input",
    labelTooltip: "名称至少2个文字",
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
    titleTooltip: "根据您的喜好量身定制健身计划",
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
    labelTooltip: "您可以选择多项，但请至少选择一项",
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
