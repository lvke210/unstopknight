const local = JSON.parse(localStorage.getItem("state"));
local ? delete local.enemy : null;
local ? delete local.system : null;
const state = local
  ? local
  : {
      levelCur: 1, //等级
      levelMax: 1000,
      exp: 0, //经验
      upgradeExp: 100,
      bloodCur: 800, //血量
      bloodMax: 1000,
      magicCur: 300, //蓝量
      magicMax: 1000,
      speed: 0.8, //攻速
      attack: 150, //攻击
      defence: 10, //防御
      sucking: 10, //吸血
      userName: "小小勇者", //角色名
      secondName: "冒险家", //称号
      isHeroDead: false,
    };
export default state;
