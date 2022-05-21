import { heroAttackInterval, enemyAttackInterval } from "./game";
let recoveryTimer, heroAttackTimer, enemyAttackTimer;
/**
 * 开始执行怪物攻击喝英雄攻击的定时器
 */
export function start() {
  // recoveryTimer = recovery();
  heroAttackTimer = heroAttackInterval();
  enemyAttackTimer = enemyAttackInterval();
}
start();

/**
 * 清除所有定时器
 * */
export function clear() {
  // clearInterval(recoveryTimer);
  clearInterval(heroAttackTimer);
  clearInterval(enemyAttackTimer);
}
