const read = require('readline-sync');

const monster = {

  name: "Лютый",
  maxHealth: 10,
  current: {
    health: null,
    move: null,
    damage: null,
    cooldowns: [
    ]
  },
  moves: [{
    "name": "Удар когтистой лапой",
    "physicalDmg": 3, // физический урон
    "magicDmg": 0, // магический урон
    "physicArmorPercents": 20, // физическая броня
    "magicArmorPercents": 20, // магическая броня
    "cooldown": 0 // ходов на восстановление
  },
  {
    "name": "Огненное дыхание",
    "physicalDmg": 0,
    "magicDmg": 4,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3
  },
  {
    "name": "Удар хвостом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 50,
    "magicArmorPercents": 0,
    "cooldown": 2
  }],

  init() {
    this.current.health = this.maxHealth;
    for (let i = 0; i < this.moves.length; i++) {
      this.current.cooldowns[i] = this.moves[i].cooldown || null;
    }
  },
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  chooseMove() {
    let id = this.random(0, this.moves.length - 1);
    
    if(this.current.cooldowns[id] != this.moves[id].cooldown) {
      this.chooseMove();
    } else {
      this.current.move = this.moves[id];
      this.current.move.id = id;
      this.current.cooldowns[id] = 0;
    }
  }
};
const player = {

  name: "Евстафий",
  maxHealth: null,
  moves: [{
    "name": "Удар боевым кадилом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 50,
    "cooldown": 0
  },
  {
    "name": "Вертушка левой пяткой",
    "physicalDmg": 4,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 4
  },
  {
    "name": "Каноничный фаербол",
    "physicalDmg": 0,
    "magicDmg": 5,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3
  },
  {
    "name": "Магический блок",
    "physicalDmg": 0,
    "magicDmg": 0,
    "physicArmorPercents": 100,
    "magicArmorPercents": 100,
    "cooldown": 4
  }],
  current: {
    health: null,
    move: null,
    damage: null,
    cooldowns: [
    ]
  },

  init() {
    console.log("\n\t====== ВЫБЕРИТЕ СЛОЖНОСТЬ (HPs) ======");
    this.maxHealth = this.current.health = +read.question("$ Enter number: ");
    for (let i = 0; i < this.moves.length; i++) {
      this.current.cooldowns[i] = this.moves[i].cooldown || null;
    }
  },
  movesMenu() {
    for (let i = 0; i < this.moves.length; i++) {
      let ready = this.moves[i].cooldown == 0 || this.current.cooldowns[i] == this.moves[i].cooldown;
      console.log(
        `[${ready ? i : 'X'}] - ${this.moves[i].name} ` +
        `\n\t(физ.ур: ${this.moves[i].physicalDmg}, маг.ур: ${this.moves[i].magicDmg}, ` +
        `физ.защ: ${this.moves[i].physicArmorPercents}%, маг.защ: ${this.moves[i].magicArmorPercents}%, ` +
        `кулдаун: ${!ready ? this.current.cooldowns[i] + ' / ' : ''}${this.moves[i].cooldown})\t`
      );
    }
  },
  chooseMove() {
    this.movesMenu();
    console.log(`\n# Здоровье Евстафия: ${this.current.health} / ${this.maxHealth} HP`);
    console.log(`# Здоровье Лютого: ${monster.current.health} / ${monster.maxHealth} HP`);

    let id = +(read.question("\n$ Your choice: "));

    if(this.current.cooldowns[id] != this.moves[id].cooldown) {
      console.log("Мне пока не хватает выносливости. Лучше выбрать что-то другое.");
      this.chooseMove();
    } else {
      this.current.move = this.moves[id];
      this.current.move.id = id;
      this.current.cooldowns[id] = 0;
    }
  }
};


const storitellingSystem = {

  tellBeginningStory() {
    console.log("\n\t====== ВСТУПЛЕНИЕ ======");
    console.log(
      "Однажды, в полную ночь, возвращался Евстафий домой, что стоял подле леса, и думал о своём. " +
      "В округе не было ни единой души, и не слышно было ни звука. Даже сверчков... " +
      "'Странно.' - подумал Евстафий и напрягся, остановившись в середине пути. Постояв немного на месте он начал ощущать чьё-то присутсвие." +
      "И только он начал принимать защитную стойку, как наблюдатель наконец проявил себя и тут же отправился в нападение."
    );
    console.log("\n\t====== НАЧАЛАСЬ БИТВА! ======");
  },
  tellGoodEndStory() {
    console.log("\n================= КОНЦОВКА =================");
    console.log(
      "Однажды, в полную ночь, возвращался Евстафий домой, что стоял подле леса, и думал о своём. " +
      "И только он начал принимать защитную стойку, как наблюдатель наконец проявил себя и тут же отправился в нападение."
    );
    // Евстафий добивает Лютого, но вдруг он начинает превращаться в человека
    // Евстафий узнаёт в нём своего старшего брата
    // - Не может быть... Лютый! ЛЮТЫ-Ы-ЫЙ!!!
    // Евстафий 2: За брата за основу взято SOON [20.05.20]
  },
  tellBadEndStory() {
    console.log("\n================= КОНЦОВКА =================");
    console.log(
      "Однажды, в полную ночь, возвращался Евстафий домой, что стоял подле леса, и думал о своём. " +
      "И только он начал принимать защитную стойку, как наблюдатель наконец проявил себя и тут же отправился в нападение."
    );
  },
}
const battleSystem = {

  logUsing(battlerName, moveName) {
    console.log(`> ${battlerName} применяет технику '${moveName}'`);
  },
  logDamaging(damagerName, damage, damagedName) {
    console.log(`> ${damagerName} наносит ${damage} урона противнику ${damagedName}`);
  },
  isExodus(battler1, battler2) {
    return battler1.current.health > 0 && battler2.current.health > 0
  },
  getDamage(attacking, defending) {
    this.current.damage = attacking.physicalDmg * (defending.physicArmorPercents / 100) + 
      attacking.magicDmg * (defending.magicArmorPercents / 100);

    return this.current.damage.toFixed(2);
  },
  makeMove(battler) {
    battler.chooseMove();
    this.loadCooldowns(battler.current.cooldowns, battler.moves, battler.current.move.id);
    this.logUsing(battler.name, battler.current.move.name);

  },
  loadCooldowns(cooldowns, moves, curMoveId) {
    for(let i = 0; i < moves.length; i++) {
      if(cooldowns[i] != moves[i].cooldown && moves[i].cooldown != 0 && i != curMoveId) {
        cooldowns[i]++;
      }
    }
  }
}


//====================== START GAME LOGIC ===========================//


player.init();
monster.init();

storitellingSystem.tellBeginningStory();

do {
  battleSystem.makeMove(player);
  battleSystem.makeMove(monster);
/*
  player.curHealth -= battleSystem.getDamage(monster.curMove, player.curMove);
  battleSystem.logDamaging(monster.name, monster.current.damage, player.name);
  console.log();
  monster.curHealth -= battleSystem.getDamage(player.curMove, monster.curMove);
  battleSystem.logDamaging(player.name, player.current.damage, monster.name);
*/
} while (battleSystem.isExodus(player, monster));





  // battleSystem.logUsing(monster.name, monster.curMove.name);
  // battleSystem.logUsing(player.name, player.curMove.name);
  // battleSystem.movesMenu(this.moves);
  // console.log(`[ Здоровье Евстафия: ${this.curHealth} / ${this.maxHealth} HP ]`);
  // console.log(`[ Здоровье Лютого: ${monster.curHealth} / ${monster.maxHealth} HP ]`);
  // monster.curMove = monster.moves[battleSystem.random(0, monster.moves.length - 1)];
  // console.log("################################################################\n");


// ========== DO-LIST ==========
  // 1. Дополнить меню всеми данными +
  // 2. Реализовать учёт кулдауна
  // 3. Дописать концовки
  // 4. Придумать куда лучше вынести начальную иницализацию кулдаунов
  // 5. Решить нужен ли мне id новыка или нет
