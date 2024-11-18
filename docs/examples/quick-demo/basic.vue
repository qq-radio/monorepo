<template></template>

<script setup lang="ts">
const a = ref(1);

const b = computed(() => a.value);

console.log("b:", b);

console.log("console:", toValue(b));
</script>
