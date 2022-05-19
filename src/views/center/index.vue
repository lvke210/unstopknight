<template>
  <div class="enemy"><Progress title="敌方" color="red" /></div>
  <div class="hero"><Progress title="生命" color="red" /></div>
  <Modal :change="closeModal" :visible="visible" content="你被怪物送到了一个地方" />
</template>
<script setup>
import { onBeforeUnmount, watchEffect, ref } from "vue";
import { recovery, heroAttack, enemyAttack } from "../../utils";
import Progress from "@/components/progress.vue";
import Modal from "@/components/modal.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
const store = useStore();
const visible = ref(false);

const isHeroDead = computed(() => {
  return store.state.isHeroDead;
});
let recoveryTimer, heroAttackTimer, enemyAttackTimer;
onBeforeUnmount(() => {
  clear();
});
// 清除所有定时器
function clear() {
  clearInterval(recoveryTimer);
  clearInterval(heroAttackTimer);
  clearInterval(enemyAttackTimer);
}

function start() {
  recoveryTimer = recovery();
  heroAttackTimer = heroAttack();
  enemyAttackTimer = enemyAttack();
}
start();

watchEffect(() => {
  if (isHeroDead.value) {
    clear();
    visible.value = true;
  }
});

function closeModal() {
  store.dispatch("change", {
    bloodCur: store.state.bloodMax,
    isHeroDead: false,
  });
  start();
  visible.value = false;
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
