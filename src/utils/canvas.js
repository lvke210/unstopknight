import store from "../store";
import { attackStatusUpdate, attackStatus, updateEnemy, getHeroAttackResult } from "./game";
const slm = new Image();
slm.src = require("../assets/slm.png");
const sword = new Image();
sword.src = require("../assets/att.png");
const tinyHero = new Image();
tinyHero.src = require("../assets/hero.png");
let drawingTimer;
let ctx2 = null;
// 怪物的位置 用于判定战斗状态: 入场和离场,position_x 到达一定数值改变战斗状态
let position_x = -200;

/**
 * 开始战斗中动画
 */
export function drawingStart(el) {
  const ctx = el.value.getContext("2d");
  ctx2 = ctx;
  let x = 0;

  drawingTimer = setInterval(() => {
    if (attackStatus.value === 0) {
      position_x += 5;
      position_x >= 0 ? attackStatusUpdate(1) : null;
    } else if (attackStatus.value === 2) {
      position_x += 5;
      position_x >= 300 ? (attackStatusUpdate(0), updateEnemy(), (position_x = -100)) : null;
    }
    x += 5;
    ctx.clearRect(0, 0, 300, 600);
    // ctx.fillRect(150, 200, 10, 10);
    drawSword(x, ctx);
    drawHero(ctx);
    drawSlm(x, ctx);
  }, 20);
}

/**
 * 停止战斗中动画
 */
export function drawingStop() {
  clearInterval(drawingTimer);
}

// 英雄持剑
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

//怪物duang duang duang
function drawSlm(x, ctx) {
  switch (attackStatus.value) {
    case 0:
      ctx.drawImage(slm, 50 - position_x, 100 - Math.abs(Math.sin((x * 2 * Math.PI) / 360) * 20));
      break;
    case 1:
      ctx.drawImage(slm, 50, 100 - Math.abs(Math.sin((x * 2 * Math.PI) / 360) * 20));
      break;
    default: //设置原点
      // 偏移大概图片一半的距离
      ctx.save();
      ctx.translate(
        150 - position_x,
        200 - Math.abs(Math.sin((position_x * 2 * Math.PI) / 360) * 100)
      );
      ctx.rotate((position_x * Math.PI) / 18);
      ctx.drawImage(slm, -100, -80);
      ctx.restore();
      break;
  }
}

//怪物受伤数字显示

export function drawEnemyLoseBlood() {
  let t = store.state.speed * 900;
  let attackNum = getHeroAttackResult(1);
  let timer = setInterval(() => {
    if (t > 0) {
      t -= 20;
      ctx2.save();
      ctx2.translate(25, 150 - (store.state.speed * 900 - t) / 20);
      ctx2.fillStyle = "#fff";
      ctx2.font = "50px serif";
      ctx2.fillText(`-${attackNum}`, 0, 0);
      ctx2.restore();
    } else {
      clearInterval(timer);
    }
  }, 20);
}
