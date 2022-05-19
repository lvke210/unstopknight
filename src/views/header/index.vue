<template>
  <div class="header-wrap">
    <div class="avatar"><img src="../../assets/avatar.png" alt="" /></div>
    <div class="title">
      <div>龙骑士龙骑士</div>
      <div>收集达人</div>
    </div>
    <div class="progress-container">
      <Progress title="等级" color="#dfd65b" />
      <Progress title="生命" color="#f44336" />
      <Progress title="法力" color="#429fdd" />
    </div>
  </div>
  <div class="exp-progress" :style="{ '--width': expWidth }"></div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import Progress from "../../components/progress.vue";
import { useStore } from "vuex";
const store = useStore();
const expWidth = computed(() => {
  return `${(store.state.exp / store.state.upgradeExp) * 100}%`;
});
</script>
<style>
.exp-progress {
  width: 100vw;
  height: 0.2rem;
  background-color: rgba(255, 255, 255, 0.219);
  position: relative;
}
.exp-progress::after {
  content: "";
  left: 0;
  top: 0;
  display: block;
  width: var(--width);
  height: 0.2rem;
  background-color: rgb(0, 233, 105);
}
.header-wrap {
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.avatar {
  position: relative;
  padding: 1rem;
}
.avatar img {
  width: 6vh;
}
.progress-container {
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 1rem;
}
.title div + div {
  margin: 10px 0;
}
</style>
