<template>
  <div class="enemy" @click="touchEnemyAttack"><Progress title="敌方" color="red" /></div>
  <div class="hero"><Progress title="生命" color="red" /></div>
  <Modal :cancel="closeModal" :visible="visible">你被怪物送到了一个地方</Modal>
</template>
<script setup>
import { onBeforeUnmount, computed } from "vue";
import Progress from "@/components/progress.vue";
import Modal from "@/components/modal.vue";
import { useStore } from "vuex";
import { start, clear } from "../../utils";
import { heroAttack } from "../../utils/game";

const store = useStore();
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
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
}
</style>
