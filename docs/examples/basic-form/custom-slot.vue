<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm v-model="model" :schemas="schemas" hasFooter>
        <template #username>
          <el-icon
            v-for="_i in 3"
            style="color: #00cef0; vertical-align: middle"
          >
            <StarFilled />
          </el-icon>
          <span style="margin: 0 10px">迈克尔</span>
          <el-icon
            v-for="_i in 3"
            style="color: #00cef0; vertical-align: middle"
          >
            <StarFilled />
          </el-icon>
        </template>
        <template #movie>
          <BasicCheckboxGroup :options="movieOptions" v-model="model.movie" />
        </template>
        <template #music>
          <BasicSelect :options="musicOptions" v-model="model.music" />
        </template>
      </BasicForm>
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ model }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import {
  BasicForm,
  FormSchema,
  BasicCheckboxGroup,
  BasicSelect,
} from "@center/components";

import { ref } from "vue";

import { StarFilled } from "@element-plus/icons-vue";

const activeNames = ref(["example"]);

const model = ref({
  movie: [],
  music: "",
});

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    customSlot: "username",
  },
  {
    label: "电影",
    prop: "movie",
    customSlot: "movie",
  },
  {
    label: "音乐",
    prop: "music",
    customSlot: "music",
  },
];

const movieOptions = [
  { label: "动作", value: "action" },
  { label: "喜剧", value: "comedy" },
  { label: "恐怖", value: "horror" },
];

const musicOptions = [
  { label: "古典乐", value: "classical" },
  { label: "蓝调", value: "blues" },
  { label: "摇滚", value: "rock" },
];
</script>
