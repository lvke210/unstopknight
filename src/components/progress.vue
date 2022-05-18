<template>
  <div class="progress" :style="{ '--color': color }">
    <div class="progress-item" :style="{ '--color': color, '--width': bgcWidth }"></div>
    <span class="numbers">
      <span class="title">{{ title }}</span>
      <span class="num"> {{ data.cur + "/" + data.max }}</span>
    </span>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["title", "color"]);

const data = computed(() => {
  switch (props.title) {
    case "等级":
      return {
        cur: store.state.levelCur,
        max: store.state.levelMax,
      };
    case "生命":
      return {
        cur: store.state.bloodCur,
        max: store.state.bloodMax,
      };
    default:
      return {
        cur: store.state.magicCur,
        max: store.state.magicMax,
      };
  }
});
const bgcWidth = computed(() => {
  return (data.value.cur / data.value.max) * 100 + "%";
});
</script>
<style scoped>
.progress {
  position: relative;
  border: 1px solid var(--color);
  height: 1.2rem;
}
.progress-item {
  width: var(--width);
  max-width: 100%;
  min-width: 0.1%;
  position: relative;
  height: 100%;
  font-size: 12px;
  background-color: var(--color);
}
.numbers {
  position: relative;
  top: -100%;
  display: flex;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  padding: 0 0.5rem;
}
.numbers span {
  display: inline-block;
}
.num {
  width: 80%;
}
</style>
