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
import department from "../../mocks/department.json";

import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";
import { ElIcon } from "element-plus";
import {
  Search,
  ArrowDown,
  ArrowUp,
  IceDrink,
  ScaleToOriginal,
} from "@element-plus/icons-vue";

const model = ref({
  username: "李华",
  age: 18,
  remark: "这是一段说明",
});

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    component: "input",
    componentSlots: {
      prefix: () => "提示：",
      suffix: () => h(ElIcon, null, () => h(Search)),
      prepend: () => "http://",
      append: () => ".com",
    },
  },
  {
    label: "年龄",
    prop: "age",
    component: "input-number",
    componentSlots: {
      "decrease-icon": () => h(ElIcon, null, () => h(ArrowDown)),
      "increase-icon": () => h(ElIcon, null, () => h(ArrowUp)),
      prefix: () => "￥",
      suffix: () => "RMB",
    },
  },
  {
    label: "饮料",
    prop: "drink",
    component: "select",
    componentProps: {
      options: [
        { label: "咖啡", value: "coffee", price: 10 },
        { label: "牛奶", value: "milk_tea", price: 5 },
        { label: "果汁", value: "juice", price: 8 },
      ],
    },
    componentSlots: {
      header: () => "请选择",
      footer: () => "任意选择多项",
      prefix: () => h(ElIcon, null, () => h(IceDrink)),
      label: ({ label, value, price }) => (
        <div style="color: red">
          {{ label }}-(￥{{ price }})
        </div>
      ),
    },
  },
  {
    label: "组织",
    prop: "department",
    component: "cascader",
    componentProps: {
      options: department,
      props: {
        value: "id",
        label: "name",
        children: "children",
        multiple: true,
      },
    },
    componentSlots: {
      empty: () => "查不到组织数据，请联系管理员",
      default: ({ node, data }) => {
        return h(
          "div",
          `${data.name}${!node.isLeaf ? "（" + data.children.length + "）" : ""}`
        );
      },
    },
  },
  {
    label: "入职日期",
    prop: "joinDay",
    component: "date-picker",
    componentSlots: {
      "range-separator": () => h(ElIcon, null, () => h(ScaleToOriginal)),
      "prev-month": () => "上一个月",
      "next-month": () => "下一个月",
    },
  },
  {
    label: "具体时间",
    prop: "joinTime",
    component: "time-picker",
    componentSlots: {
      "range-separator": () => h(ElIcon, null, () => h(ScaleToOriginal)),
      "prev-month": () => "上一个月",
      "next-month": () => "下一个月",
    },
  },
  {
    label: "是否全职",
    prop: "isFullJob",
    component: "switch",
    componentProps: {
      style: {
        "--el-switch-on-color": "#13ce66",
        "--el-switch-off-color": "#ff4949",
      },
    },
    componentSlots: {
      "active-action": () => <div style="color: green">全职</div>,
      "inactive-action": () => <div style="color: green">兼职</div>,
    },
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const handleSubmit = () => {};
</script>
