<template>
  <BasicForm v-model="model" :schemas="schemas" @submit="handleSubmit" />
</template>

<script lang="ts" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const model = ref<Recordable>({});

const schemas: FormSchema[] = [
  {
    label: "奖品名称",
    prop: "awardName",
    slot: "select-award",
    componentProps: {
      placeholder: "请选择奖品",
    },
    required: true,
  },
  {
    label: "商户编码",
    prop: "storeNumber",
    componentProps: {
      placeholder: "根据选择的商户自动填写",
    },
    disabled: true,
  },
  {
    label: "商户名称",
    prop: "storeNumber",
    slot: "select-store",
    componentProps: {
      placeholder: "请选择商户",
    },
    required: true,
  },
  {
    label: "奖品数量",
    prop: "number",
    component: "input-number",
    componentProps: {
      min: 1,
    },
    required: true,
  },
  {
    label: "开奖日期",
    prop: "awardDate",
    component: "date-picker",
    required: true,
  },
  {
    label: "开奖开始时间",
    prop: "awardStartTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
      valueFormat: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "开奖结束时间",
    prop: "awardEndTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
      valueFormat: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "扫箱内码数量",
    prop: "boxInNumber",
    component: "input-number",
    componentProps: {
      min: 1,
    },
    required: true,
  },
  {
    label: "扫箱码开始时间",
    prop: "boxInStartTime",
    component: "date-picker",
  },
  {
    label: "扫箱码结束时间",
    prop: "boxInEndTime",
    component: "date-picker",
  },
  {
    label: "指定开奖商品",
    prop: "awardProductIdList",
    slot: "select-award-product",
    componentProps: {
      placeholder: "请选择指定开奖商品",
    },
  },
  {
    label: "指定扫箱内码商品",
    prop: "scanProductIdList",
    slot: "select-scan-product",
    componentProps: {
      placeholder: "请选择指定扫箱内码商品",
    },
  },
  {
    label: "是否生效",
    prop: "status",
    component: "radio",
    componentProps: {
      options: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
    },
    defaultValue: 0,
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "160px",
});

const handleSubmit = () => {};
</script>
