<template>
  <div class="enemy">enemy</div>
  <div class="hero"><Progress title="生命" color="red" /></div>
</template>
<script setup>
import { onBeforeUnmount } from "vue";
import { recovery } from "../../utils";
import Progress from "@/components/progress.vue";
let timer;
// 自动恢复
timer = recovery();

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.enemy,
.hero {
  width: 50%;
  height: 50vw;
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
}
</style>
