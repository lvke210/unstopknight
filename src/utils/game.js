import { clear } from "./index";
import store from "../store";

//伤害计算 英雄对怪物
function getHeroAttackResult(type) {
  if (type) {
    return store.state.attack > store.state.enemy.defence
      ? store.state.attack - store.state.enemy.defence
      : 1;
  } else {
    return store.state.enemy.attack > store.state.defence
      ? store.state.enemy.attack - store.state.defence
      : 1;
  }
}

// 回复
export function recovery() {
  return setInterval(() => {
    store.dispatch("change", {
      bloodCur: store.state.bloodCur + 1,
      magicCur: store.state.magicCur + 1,
    });
  }, 1000);
}
//英雄攻击
export function heroAttackInterval() {
  return setInterval(() => {
    heroAttack();
  }, store.state.speed * 1000);
}
export function heroAttack() {
  const isAlive = store.state.enemy.bloodCur > 0;
  if (isAlive) {
    //敌方扣血
    const value =
      store.state.enemy.bloodCur - getHeroAttackResult(1) < 0
        ? 0
        : store.state.enemy.bloodCur - getHeroAttackResult(1);
    store.dispatch("enemyChange", {
      bloodCur: value,
    });
    //英雄吸血
    const nextBlood =
      store.state.bloodCur + Math.round((store.state.attack * store.state.sucking) / 100);
    store.dispatch("change", {
      bloodCur: nextBlood >= store.state.bloodMax ? store.state.bloodMax : nextBlood,
    });
  } else {
    //怪物刷新
    store.dispatch("enemyChange", {
      bloodCur: store.state.enemy.bloodMax,
      bloodMax: store.state.enemy.bloodMax + store.state.stage * 10,
    });

    // 怪物死亡 英雄升级
    const isUpgradeEnble =
      store.state.exp + store.state.enemy.levelCur * 10 >= store.state.upgradeExp;
    if (isUpgradeEnble) {
      store.dispatch("change", {
        levelCur: store.state.levelCur + 1,
        upgradeExp: store.state.upgradeExp + store.state.levelCur * 10,
        exp: 0,
        attack: store.state.attack + 10,
        defence: store.state.defence + 10,
        bloodMax: store.state.bloodMax + 10,
        bloodCur: store.state.bloodMax,
        magicCur: store.state.magicMax,
      });
    } else {
      store.dispatch("change", {
        exp: store.state.exp + store.state.enemy.levelCur * 10,
      });
    }
  }
}
// 怪物攻击

export function enemyAttackInterval() {
  return setInterval(() => {
    enemyAttack();
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
