<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicButtonGroup :buttons="buttons" style="margin: 20px" />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
  <BasicDialog @register="registerDialog" @confirm="submit">
    <BasicForm
      v-model="formModel"
      :disabled="!!formModel.id"
      @register="registerForm"
      @submit="handleSubmit"
    />
  </BasicDialog>
</template>

<script lang="ts" setup>
import {
  BasicDialog,
  useDialog,
  BasicForm,
  FormSchema,
  useForm,
  BasicButtonGroup,
  Button,
} from "@center/components";

import { ref, nextTick } from "vue";

const activeNames = ref(["example"]);

const [registerDialog, { openDialog, setDialogTitle }] = useDialog({
  title: "弹窗表单示例",
});

const formModel = ref<any>({});

const formSchemas: FormSchema[] = [
  {
    label: "咖啡",
    prop: "drink",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "拿铁", value: "latte" },
        { label: "卡布奇诺", value: "cappuccino" },
        { label: "美式", value: "americano" },
      ],
    },
    required: true,
  },
  {
    label: "规格",
    prop: "size",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "大杯(500ml)", value: "large" },
        { label: "小杯(350ml)", value: "small" },
      ],
    },
    required: true,
  },
  {
    label: "温度",
    prop: "temperature",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "热", value: "hot" },
        { label: "冰", value: "ice" },
      ],
    },
    required: true,
  },
  {
    label: "需要吸管",
    prop: "needStraw",
    component: "switch",
    defaultValue: true,
    required: true,
  },
  {
    label: "联系人",
    prop: "name",
    required: true,
  },
  {
    label: "联系电话",
    prop: "phone",
    required: true,
  },
  {
    label: "收货地址",
    prop: "address",
    component: "textarea",
    required: true,
  },
];

const [registerForm, { submit, reset }] = useForm({
  schemas: formSchemas,
});

const handleSubmit = (values) => {
  console.log("values:", values);
};

const detailData = {
  drink: "americano",
  size: "large",
  temperature: "ice",
  needStraw: true,
  name: "李娟娟",
  phone: "13513699874",
  address: "广东省南山市塘朗城",
};

const buttons: Button[] = [
  {
    text: "新增",
    onClick: async () => {
      setDialogTitle("新增");
      openDialog();
      await nextTick();
      reset();
      formModel.value = {};
    },
  },
  {
    text: "编辑",
    onClick: async () => {
      setDialogTitle("编辑");
      openDialog();
      await nextTick();
      reset();
      formModel.value = detailData;
    },
  },
  {
    text: "查看详情",
    onClick: async () => {
      setDialogTitle("查看详情");
      openDialog();
      await nextTick();
      reset();
    },
  },
];
</script>
