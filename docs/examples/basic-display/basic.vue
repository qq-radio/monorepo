<template>
  <div v-for="item in array" :key="item.label">
    <div style="display: flex">
      <span style="margin-right: 10px">{{ item.label }}:</span>
      <BasicDisplay
        :type="item.type"
        :value="row[item.prop]"
        :displayProps="item.displayProps"
        :displaySlots="item.displaySlots"
      />
    </div>
    <el-divider style="margin: 10px 0" />
  </div>
</template>

<script setup lang="ts">
import { BasicDisplay, DisplaySchema } from "@center/components";

const array: DisplaySchema[] = [
  {
    label: "链接",
    prop: "link",
    type: "link",
    displayProps: {
      type: "success",
      href: "/components/basic-list",
    },
  },
  {
    label: "标签",
    prop: "tag",
    type: "tag",
    displayProps: {
      type: "warning",
    },
    displaySlots: {
      default: () => "跳转下一章节",
    },
  },
  {
    label: "进度条",
    prop: "progress",
    type: "progress",
    displayProps: {
      style: {
        width: "100px",
      },
    },
  },
  {
    label: "头像",
    prop: "avatar",
    type: "avatar",
    displayProps: {},
  },
  {
    label: "图片",
    prop: "image",
    type: "image",
    displayProps: {},
  },
  {
    label: "复制",
    prop: "copy",
    type: "copy",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    // 这个还是不知道怎么设计？
    options: [
      {
        label: "未解决",
        value: "0",
        color: "red",
      },
      {
        label: "已解决",
        value: "1",
        color: "blue",
      },
      {
        label: "解决中",
        value: "2",
        color: "yellow",
      },
      {
        label: "失败",
        value: "3",
        color: "red",
      },
    ],
  },
  {
    label: "时间",
    prop: "time",
    type: "time",
  },
];

const row = {
  link: "www.baidu.com",
  tag: "",
  progress: 40,
  avatar:
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  image:
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  copy: "这是一段文字，您可以点击右侧图标复制它",
  status: 1,
  time: new Date(),
};
</script>
