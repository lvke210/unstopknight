<template>
  <div class="header-wrap">
    <div class="avatar"><img src="../../assets/avatar.png" alt="" /></div>
    <div class="title">
      <div>龙骑士龙骑士</div>
      <div>收集达人</div>
    </div>
    <div class="progress-container">
      <Progress
        title="等级"
        color="#dfd65b"
        :numData="{ cur: 324, max: 1000 }"
      />
      <Progress title="生命" color="#f44336" :numData="{ cur: 1, max: 1000 }" />
      <Progress
        title="法力"
        color="#429fdd"
        :numData="{ cur: 1000, max: 1000 }"
      />
    </div>
  </div>
</template>
<script setup>
import Progress from "../../components/progress.vue";
</script>
<style>
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
