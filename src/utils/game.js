import store from "../store";
import { computed } from "vue";
import { watchEffect } from "vue";
let recoveryTimer, heroAttackTimer, enemyAttackTimer;
/**
 * 开始执行怪物攻击喝英雄攻击的定时器
 */
export function start() {
  // recoveryTimer = recovery();
  heroAttackTimer = heroAttackInterval();
  enemyAttackTimer = enemyAttackInterval();
}
/**
 * 清除所有定时器
 * */
export function clear() {
  // clearInterval(recoveryTimer);
  clearInterval(heroAttackTimer);
  clearInterval(enemyAttackTimer);
}
import { drawEnemyLoseBlood } from "./canvas";

// 战斗状态
export const attackStatus = computed(() => {
  return store.state.system.attackStatus;
});
watchEffect(() => {
  attackStatus.value === 1 ? start() : clear();
});

/**
 * 伤害计算 英雄对怪物
 * @type 存在时计算怪物对英雄
 */
export function getHeroAttackResult(type) {
  if (type) {
    return store.state.attack > store.state.enemy.defence
      ? store.state.attack - store.state.enemy.defence
      : 0;
  } else {
    return store.state.enemy.attack > store.state.defence
      ? store.state.enemy.attack - store.state.defence
      : 0;
  }
}

/**
 *  HP,MP回复
 */
export function recovery() {
  return setInterval(() => {
    store.dispatch("change", {
      bloodCur: store.state.bloodCur + 1,
      magicCur: store.state.magicCur + 1,
    });
  }, 1000);
}
/**
 * 英雄攻击
 */
export function heroAttackInterval() {
  updateEnemy();
  return setInterval(() => {
    attackStatus.value === 1 ? heroAttack() : null;
  }, store.state.speed * 1000);
}
export function heroAttack() {
  //敌方扣血
  const bloodCur =
    store.state.enemy.bloodCur - getHeroAttackResult(1) < 0
      ? 0
      : store.state.enemy.bloodCur - getHeroAttackResult(1);
  store.dispatch("enemyChange", {
    bloodCur,
  });
  //英雄吸血
  const nextBlood =
    store.state.bloodCur + Math.round((store.state.attack * store.state.sucking) / 100);

  store.state.bloodCur < store.state.bloodMax
    ? store.dispatch("change", {
        bloodCur: nextBlood >= store.state.bloodMax ? store.state.bloodMax : nextBlood,
      })
    : null;
  // bloodCur为0代表怪物死亡,立即执行死亡之后的操作,
  if (!bloodCur) {
    clear(); //停止战斗（清除定时器）
    attackStatusUpdate(2); // 更改战斗状态

    // 更新关卡信息
    const isStageUpgrade = store.state.system.stageCur === 0;
    store.dispatch("systemChange", {
      stageCur: isStageUpgrade ? store.state.system.stageMax : store.state.system.stageCur - 1,
      stage: isStageUpgrade ? store.state.system.stage + 1 : store.state.system.stage,
      lastActiveTime: new Date().getTime(),
    });

    // 怪物死亡 英雄升级或者累积经验
    const isUpgradeEnble =
      store.state.exp + store.state.enemy.levelCur * 10 >= store.state.upgradeExp;
    if (isUpgradeEnble) {
      heroUpgrade();
    } else {
      store.dispatch("change", {
        exp: store.state.exp + store.state.enemy.levelCur * 10,
      });
    }
    //save
    setlocalStorage();
  }
}
/**
 * 英雄升级
 */
export function heroUpgrade() {
  store.dispatch("change", {
    levelCur: store.state.levelCur + 1,
    upgradeExp: 100 + Math.pow(store.state.levelCur, 2),
    exp: 0,
    attack: store.state.attack + 10,
    defence: store.state.defence + 10,
    bloodMax: store.state.bloodMax + 10,
    bloodCur: store.state.bloodMax,
    magicCur: store.state.magicMax,
  });
}

/**
 * 怪物攻击
 */
export function enemyAttackInterval() {
  return setInterval(() => {
    attackStatus.value === 1 ? enemyAttack() : null;
  }, 1000);
}
export function enemyAttack() {
  const isHeroAlive = store.state.bloodCur - getHeroAttackResult() > 0;
  if (isHeroAlive) {
    store.dispatch("change", {
      bloodCur: store.state.bloodCur - getHeroAttackResult(),
    });
  } else {
    console.log("died");
    clear();
    store.dispatch("change", {
      isHeroDead: true,
      bloodCur: 0,
    });
    store.dispatch("systemChange", {
      deadVisible: true,
    });
  }
}

/**
 * 怪物刷新数据
 */
export function updateEnemy() {
  store.dispatch("enemyChange", {
    bloodCur: store.state.enemy.bloodMax,
  });
}
/**
 * 怪物刷新数据
 */
export function enemyUpgrade() {
  store.dispatch("enemyChange", {
    bloodCur: store.state.enemy.bloodMax,
    bloodMax: store.state.enemy.bloodMax + store.state.system.stage * 10,
  });
}

/**
 * 更改战斗状态
 * @value Number { 0:战斗前,1:战斗中,2:战斗结束 }
 */
export function attackStatusUpdate(value) {
  store.dispatch("systemChange", { attackStatus: value });
}

/**
 *  本读存储
 */
function setlocalStorage() {
  const { state } = store;
  localStorage.setItem("state", JSON.stringify(state));
}

/**
 *  获取离线时间
 */

export function getTimeDiff() {
  const oldTime = store.state.system.lastActiveTime;
  const nowTime = new Date().getTime(); // 现在的时间
  const cha = nowTime - oldTime; // 时间戳的差值
  // const day = Math.floor(cha / 1000 / 60 / 60 / 24);
  // const hour = Math.floor((cha / 1000 / 60 / 60) % 24);
  // const fen = Math.floor((cha / 1000 / 60) % 60);
  const sec = Math.floor((cha / 1000) % 60);
  return sec;
}
console.log(getTimeDiff(), "getTimeDiff");

/**
 * 触发离线收益
 */
export function getOfflineProfit() {
  const offlineTime = getTimeDiff();
  if (offlineTime < 600) {
    return;
  }
}
