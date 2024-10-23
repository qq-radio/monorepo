<template>
  表单填写值{{ model }}
  <BasicForm
    v-model="model"
    @submit="handleSubmit"
    @register="registerForm"
    hasFooter
  />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const model = ref({
  username: "李华",
  age: 18,
  remark: "这是一段说明",
});

const schemas: FormSchema[] = [
  {
    label: "input-用户",
    prop: "username",
    required: true,
  },
  {
    label: "input-number-年龄",
    prop: "age",
    component: "input-number",
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const handleSubmit = () => {};
</script>
