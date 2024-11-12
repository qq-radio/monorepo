<template>
  <BasicButtonGroup :buttons="buttons" :callbackParams="callbackParams" />
</template>

<script lang="tsx" setup>
import { BasicButtonGroup, Button } from "@center/components";

interface CustomCallbackParams {
  row: {
    [key: string]: any;
  };
  column: {
    [key: string]: any;
  };
  columnIndex: number;
}

const callbackParams: CustomCallbackParams = {
  row: {
    a: "我也不知道这样可以不可以",
    b: "就先这样把？？？",
  },
  column: {
    c: 0,
    dddd: 1,
  },
  columnIndex: 1,
};

const buttons: Button<CustomCallbackParams>[] = [
  {
    text: "编辑",
    onClick: ({ row, column, columnIndex, button }) => {
      console.log("button:", button);
      console.log("点击了编辑", row);
      console.log("点击了编辑", column);
      console.log("点击了编辑", columnIndex);
    },
  },
];
</script>
