<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <el-card header="商品信息" shadow="hover">
        <BasicForm
          v-model="formModel.product"
          @register="registerProductForm"
        />
      </el-card>
      <el-card header="收货信息" shadow="hover">
        <BasicForm
          v-model="formModel.delivery"
          @register="registerDeliveryForm"
        />
      </el-card>
      <el-button
        type="primary"
        style="float: right; margin: 10px"
        @click="submit"
      >
        提交
      </el-button>
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { BasicForm, FormSchema, useForm } from "@center/components/basic-form";

import { ref } from "vue";

const activeNames = ref(["example"]);

const formModel = ref({
  product: {},
  delivery: {},
});

const productFormSchemas: FormSchema[] = [
  {
    label: "咖啡",
    prop: "coffee",
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
];

const deliveryFormSchemas: FormSchema[] = [
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

const [registerProductForm, { submit: submitProductForm }] = useForm({
  schemas: productFormSchemas,
});

const [registerDeliveryForm, { submit: submitDeliveryForm }] = useForm({
  schemas: deliveryFormSchemas,
});

const submit = () => {
  submitProductForm();
  submitDeliveryForm();
};
</script>
