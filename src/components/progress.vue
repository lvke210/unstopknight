<template>
  <div class="progress">
    <div
      class="progress-item"
      :style="{ '--color': color, '--width': bgcWidth }"
    ></div>
    <span class="numbers">
      <span class="title">{{ title }}</span>
      <span class="num"> {{ numData.cur + "/" + numData.max }}</span>
    </span>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps(["color", "numData", "title"]);
const bgcWidth = `${(props.numData.cur / props.numData.max) * 100}%`;
</script>
<style scoped>
.progress {
  position: relative;
}
.progress-item {
  width: var(--width);
  max-width: 100%;
  min-width: 0.1%;
  position: relative;
  height: 100%;
  font-size: 12px;
  border: 1px solid var(--color);
  background-color: var(--color);
}
.numbers {
  position: relative;
  top: -100%;
  display: flex;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
}
.numbers span {
  display: inline-block;
}
.num {
  width: 80%;
  text-align: center;
}
</style>
