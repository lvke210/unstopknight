<template>
  <div class="enemy" @click="touchEnemyAttack"><Progress title="敌方" color="red" /></div>
  <div class="hero"><Progress title="生命" color="red" /></div>
  <canvas ref="canvas" class="canvas" width="300" height="600"></canvas>
  <div class="hero-skill">
    <button @click="upgrade" class="btn">升级</button>
    <button class="btn" @click="nextEnemy">继续</button>
  </div>
  <Modal :cancel="closeModal" :visible="visible">你被怪物送到了一个地方</Modal>
</template>
<script setup>
import { onBeforeUnmount, computed, ref, onMounted } from "vue";
import Progress from "@/components/progress.vue";
import Modal from "@/components/modal.vue";
import { useStore } from "vuex";
import { start, clear } from "../../utils";
import { heroAttack, heroUpgrade } from "../../utils/game";
import { drawingStart } from "../../utils/canvas.js";

const store = useStore();
const canvas = ref(null);

onMounted(() => {
  drawingStart(canvas);
});

const visible = computed(() => {
  return store.state.system.deadVisible;
});
onBeforeUnmount(() => {
  clear();
});

function closeModal() {
  store.dispatch("change", {
    bloodCur: store.state.bloodMax,
    isHeroDead: false,
  });
  store.dispatch("enemyChange", {
    bloodCur: store.state.enemy.bloodMax,
  });
  store.dispatch("systemChange", {
    deadVisible: false,
  });
  start();
}
function touchEnemyAttack() {
  heroAttack();
}

function upgrade() {
  console.log("升级");
  heroUpgrade();
}
function nextEnemy() {
  start();
}
</script>

<style scoped>
.enemy,
.hero {
  width: 50%;
  height: 50vw;
  border-radius: 50%;
  text-align: center;
}
.enemy {
  z-index: 1;
}
.canvas {
  position: absolute;
}
button {
  z-index: 999;
}
.hero-skill {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border: 1px solid red;
}
</style>
