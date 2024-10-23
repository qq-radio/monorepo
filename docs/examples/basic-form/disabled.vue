<template>
  {{ formModel }}
  <BasicForm
    v-model="formModel"
    @register="registerForm"
    @submit="submit"
    hasFooter
  />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";
import department from "../../mocks/department.json";

import { ref } from "vue";

const formModel = ref({
  username: "李华",
  age: 18,
  remark: "这是一段说明",
});

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    component: "input",
  },
  {
    label: "礼物",
    prop: "gift",
    component: "radio",
    componentProps: {
      options: [
        { label: "手机", value: "phone" },
        { label: "电脑", value: "computer" },
      ],
    },
  },
  {
    label: "手机品牌",
    prop: "phoneBrand",
    component: "select",
    componentProps: {
      options: [
        { label: "苹果", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
    disabled: ({ model }) => !model.gift || model.gift === "computer",
  },
  {
    label: "电脑品牌",
    prop: "computerBrand",
    component: "select",
    componentProps: {
      options: [
        { label: "联想", value: "lenovo" },
        { label: "惠普", value: "hp" },
        { label: "戴尔", value: "dell" },
      ],
    },
    disabled: ({ model }) => !model.gift || model.gift === "phone",
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const submit = () => {};
</script>
