<template>
  <div class="stage-info">关卡:{{ stage }} 剩余怪物:{{ stageProgress }}</div>
  <div class="enemy" @click="touchEnemyAttack"><Progress title="敌方" color="red" /></div>
  <div class="hero"><Progress title="生命" color="red" /></div>
  <canvas ref="canvas" class="canvas" width="300" height="600"></canvas>
  <canvas ref="canvas" class="canvas" id="canvas2" width="300" height="600"></canvas>
  <div class="hero-skill">
    <button @click="upgrade" class="btn">升级</button>
    <button class="btn" @click="nextEnemy">继续</button>
    <button class="btn" @click="stopAttack">停止</button>
  </div>
  <Modal :cancel="closeModal" :visible="visible">你被怪物送到了一个地方</Modal>
</template>
<script setup>
import { onBeforeUnmount, computed, ref, onMounted } from "vue";
import Progress from "@/components/progress.vue";
import Modal from "@/components/modal.vue";
import { useStore } from "vuex";
import { heroAttack, heroUpgrade, attackStatusUpdate, start, clear } from "../../utils/game";
import { drawingStart } from "../../utils/canvas.js";

const store = useStore();
const canvas = ref(null);
const stage = computed(() => {
  return store.state.system.stage;
});
const stageProgress = computed(() => {
  return store.state.system.stageCur;
});

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
  attackStatusUpdate(0);
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
function stopAttack() {
  clear();
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
.stage-info {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
</style>
