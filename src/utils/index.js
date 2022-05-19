import { heroAttackInterval, enemyAttackInterval } from "./game";
let recoveryTimer, heroAttackTimer, enemyAttackTimer;

export function start() {
  // recoveryTimer = recovery();
  heroAttackTimer = heroAttackInterval();
  enemyAttackTimer = enemyAttackInterval();
}
start();

// 清除所有定时器
export function clear() {
  clearInterval(recoveryTimer);
  clearInterval(heroAttackTimer);
  clearInterval(enemyAttackTimer);
}
