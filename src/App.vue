<template>
  <div class="wrap">
    <div class="header"><Header /></div>
    <div class="center"><Center /></div>
    <div class="footer"><Footer /></div>
  </div>
</template>
<script setup>
import Footer from "./views/footer";
import Header from "./views/header";
import Center from "./views/center";
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrap {
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/fe8c48e89835faab414bb2479c185703.jpeg");
  background-size: contain;
  display: flex;
  flex-direction: column;
}
.header,
.footer {
  height: 10vh;
  width: 100%;
}
.center {
  flex-grow: 1;
  border: 1px solid red;
  width: 100%;
}
</style>
