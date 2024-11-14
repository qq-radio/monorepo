<template>
  <BasicPagination
    v-model="page"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    @change="handleChange"
  />
  <br />
  page改变值：{{ page }}
</template>

<script setup lang="ts">
import { BasicPagination } from "@center/components";

const page = ref({
  currentPage: 1,
  pageSize: 20,
  total: 86,
});

const handleCurrentChange = (p) => {
  console.log("current-change", p);
};

const handleSizeChange = (s) => {
  console.log("size-change", s);
};

const handleChange = (page) => {
  console.log("change", page);
};
</script>
