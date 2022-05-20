<template>
  <div class="enemy" @click="touchEnemyAttack"><Progress title="敌方" color="red" /></div>
  <div class="hero"><Progress title="生命" color="red" /></div>
  <!-- <button @click="handleClick">button</button> -->
  <!-- <button @click="handleClick2">button33</button> -->
  <canvas ref="canvas" class="canvas" width="300" height="600"></canvas>
  <Modal :cancel="closeModal" :visible="visible">你被怪物送到了一个地方</Modal>
</template>
<script setup>
import { onBeforeUnmount, computed, ref, onMounted } from "vue";
import Progress from "@/components/progress.vue";
import Modal from "@/components/modal.vue";
import { useStore } from "vuex";
import { start, clear } from "../../utils";
import { heroAttack } from "../../utils/game";

const store = useStore();
const canvas = ref(null);
let ctx;
const slm = new Image();
slm.src = require("../../assets/slm.png");
const sword = new Image();
sword.src = require("../../assets/att.png");
const tinyHero = new Image();
tinyHero.src = require("../../assets/hero.png");

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  let x = 0;
  setInterval(() => {
    x += 5;
    ctx.clearRect(0, 0, 300, 600);
    drawSword(x);
    drawSlm(x);
    drawHero();
  }, 20);
});
function drawHero() {
  ctx.drawImage(tinyHero, 45, 410, 150, 150);
}
function drawSword(x) {
  ctx.save();
  ctx.translate(150, 480);
  ctx.rotate(6.3 + Math.sin((x * 2 * Math.PI) / 360) / 10);
  // ctx.rotate(x);
  ctx.drawImage(sword, 20, -30, 50, 50);
  ctx.restore();
}

function drawSlm(x) {
  ctx.drawImage(slm, 50, 100 - Math.abs(Math.sin((x * 2 * Math.PI) / 360) * 20));
}

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
</style>
