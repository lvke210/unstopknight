<template>
  <div class="footer-wrap">
    <div class="footer-item">角色</div>
    <div class="footer-item">伙伴</div>
    <div class="footer-item">关卡</div>
    <div class="footer-item">背包</div>
    <div class="footer-item">商城</div>
  </div>
</template>
<script setup></script>
<style scoped>
.footer-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.footer-item {
  width: 6vh;
  height: 6vh;
  text-align: center;
  display: grid;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  background: #dddddd82;
}
</style>
