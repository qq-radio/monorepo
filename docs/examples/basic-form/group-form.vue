<template>
  <BasicForm
    v-model="model"
    :colProps="{ span: 10 }"
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
    required: true,
  },
  {
    label: "水果",
    prop: "fruit",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "葡萄", value: "grape" },
        { label: "樱桃", value: "cherry" },
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
