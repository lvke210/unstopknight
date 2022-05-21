import store from "../store";

const slm = new Image();
slm.src = require("../assets/slm.png");
const sword = new Image();
sword.src = require("../assets/att.png");
const tinyHero = new Image();
tinyHero.src = require("../assets/hero.png");
let drawingTimer;
/**
 * 开始战斗中动画
 */
export function drawingStart(el) {
  const ctx = el.value.getContext("2d");
  let x = 0;
  drawingTimer = setInterval(() => {
    x += 5;
    ctx.clearRect(0, 0, 300, 600);
    drawSword(x, ctx);
    drawSlm(x, ctx);
    drawHero(ctx);
  }, 20);
}
/**
 * 停止战斗中动画
 */
export function drawingStop() {
  clearInterval(drawingTimer);
}

function drawHero(ctx) {
  ctx.drawImage(tinyHero, 45, 410, 150, 150);
}
function drawSword(x, ctx) {
  ctx.save();
  ctx.translate(150, 480);
  ctx.rotate(6.3 + Math.sin((x * 2 * Math.PI) / 360) / 10);
  // ctx.rotate(x);
  ctx.drawImage(sword, 20, -30, 50, 50);
  ctx.restore();
}

function drawSlm(x, ctx) {
  const num =
    store.state.system.attackStatus === 1 ? Math.abs(Math.sin((x * 2 * Math.PI) / 360) * 20) : 0;
  ctx.drawImage(slm, 50, 100 - num);
}
