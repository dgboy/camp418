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
    const NO_COOLDOWN_MOVE = 0;
    let id = this.random(0, this.moves.length - 1);
    
    if(this.current.cooldowns[id] != this.moves[id].cooldown) {
      id = NO_COOLDOWN_MOVE;
    }
    
    this.current.move = this.moves[id];
    this.current.move.id = id;
    this.current.cooldowns[id] = 0;

    // this.movesMenu();
  },
  movesMenu() {
    for (let i = 0; i < this.moves.length; i++) {
      let ready = this.moves[i].cooldown == 0 || this.current.cooldowns[i] == this.moves[i].cooldown;
      console.log(
        `${ready ? `[${i}]` : ' X '} - ${this.moves[i].name} ` +
        `\n\t(физ.ур: ${this.moves[i].physicalDmg}, маг.ур: ${this.moves[i].magicDmg}, ` +
        `физ.защ: ${this.moves[i].physicArmorPercents}%, маг.защ: ${this.moves[i].magicArmorPercents}%, ` +
        `кулдаун: ${!ready ? this.current.cooldowns[i] + ' / ' : ''}${this.moves[i].cooldown})\t`
      );
    }
  },
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
    
    console.log("\n========= ВЫБЕРИТЕ СЛОЖНОСТЬ (HPs) ===========");
    this.maxHealth = this.current.health = +read.question("$ Enter number: ");
    for (let i = 0; i < this.moves.length; i++) {
      this.current.cooldowns[i] = this.moves[i].cooldown || null;
    }
  },
  movesMenu() {
    for (let i = 0; i < this.moves.length; i++) {
      let ready = this.moves[i].cooldown == 0 || this.current.cooldowns[i] == this.moves[i].cooldown;
      console.log(
        `${ready ? `[${i}]` : ' X '} - ${this.moves[i].name} ` +
        `\n\t(физ.ур: ${this.moves[i].physicalDmg}, маг.ур: ${this.moves[i].magicDmg}, ` +
        `физ.защ: ${this.moves[i].physicArmorPercents}%, маг.защ: ${this.moves[i].magicArmorPercents}%, ` +
        `кулдаун: ${!ready ? this.current.cooldowns[i] + ' / ' : ''}${this.moves[i].cooldown})\t`
      );
    }
  },
  chooseMove() {
    this.movesMenu();
    console.log(`\n# Здоровье Евстафия: ${this.current.health} / ${this.maxHealth} HP`);
    // console.log(`# Здоровье Лютого: ${monster.current.health} / ${monster.maxHealth} HP`);

    let id = +(read.question("\n$ Your choice: "));

    if(id < 0 || id >= this.moves.length) {
      console.log("\n!!! Что-то я не помню, чтобы у меня была такая техника. !!!\n");
      this.chooseMove();
    } else if(this.moves[id].cooldown != 0 && this.current.cooldowns[id] != this.moves[id].cooldown) {
      console.log("\n!!! Мне пока не хватает выносливости. Лучше выбрать что-то другое. !!!\n");
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
    console.log("\n================ ВСТУПЛЕНИЕ ==================");
    console.log(
      "Однажды, в полную ночь, возвращался Евстафий домой, что стоял подле леса, и думал о своём.\n" +
      "В округе не было ни единой души, и не было слышно почти ни звука. Даже стрекота цикад... \n" +
      "'Странно.' - подумал Евстафий и напрягся, остановившись в пол пути от дома.\n" +
      "Постояв немного на месте он начал ощущать чьё-то присутсвие.\n" +
      "И только он начал принимать защитную стойку, как наблюдатель наконец проявил себя и тут же пошёл в нападение."
    );
    console.log("\n============== НАЧАЛАСЬ БИТВА! ===============");
  },
  tellGoodEndStory() {
    console.log("================= ВЫ ПОБЕДИЛИ =================");
    console.log("\n=================== КОНЦОВКА ==================");
    console.log(
      "Евстафий вновь занёс свой коронный удар пяткой над противником и тот, уже измождённый, рушится на землю.\n" +
      "Евстафий, тяжко отдышавшись после яростной битвы, начал быстренько залечивать свои раны.\n" +
      "Но вдруг! Некогда лютый человекоподобный зверь постепенно начал обращаться в человека.\n" + 
      "Евстафий впал в ступор. Увидев конечную форму, он не мог сказать и слова. Так как Лютый оказался его сыном!\n" + 
      "Только он захотел было пасть в печали перед мёртвым сыном, как вдруг он услышал яростный вопль со стороны его дома.\n" +
      "Не думая ни минуты, от тут же помчался в сторону дома, беспокоясь за остальную часть семьи.\n" +
      "Запыхавшись, он добрался до своего всё ещё целого дома. Но когда он зашёл внутрь. Он увидел...\n" +
      "\n\t     Евстафий: Потерявши всё\n" +
      "\t\t[SOON 20.06.20]"
    );
    console.log("\n================== КОНЕЦ ИГРЫ ==================\n");
  },
  tellDrawEndStory() {
    console.log("==================== НИЧЬЯ ====================\n");
    console.log("=================== КОНЦОВКА ==================");
    console.log(
      "Битва шла долго, до полного изнемождения. Противники шли нос в нос. Но в итоге оба устали так, что последующий удар стал решающим.\n" +
      "Они приготовились, и пронеслась последняя пара смертельных ударов. Рев битвы исчез. Никто не смог уклониться.\n" +
      "Вонзившись в друг друга, соперникам остовалось лишь наблюдать за угасанием жизни друг друга.\n" +
      "Вскоре, поле сново накрыло безвучье, как и в самом начале истории."+ 
      "Лишь ветер свистел, пролетая над полем, где сияла лужа полная крови, в который лежало два человека, не собладавших с силой друг друга."
    );
    console.log("\n================== КОНЕЦ ИГРЫ ==================\n");
  },
  tellBadEndStory() {
    console.log("================= ВЫ ПРОИГРАЛИ =================");
    console.log("\n=================== КОНЦОВКА ===================");
    console.log(
      "Острые когти врываются в сердце израненного Евстафия и он, прокашляв кровью, безжизненно падает на землю.\n" +
      "Последнее, что успевает увидеть Евстафий, это лицо своего убийцы, наполненное какой-то неведомой печалью.\n" +
      "Не успев проанализировать увиденное, сознание покидает его."
    );
    console.log("\n================== КОНЕЦ ИГРЫ ==================\n");
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
  makeMove(battler) {
    battler.chooseMove();
    this.loadCooldowns(battler.current.cooldowns, battler.moves, battler.current.move.id);
    this.logUsing(battler.name, battler.current.move.name);
  },
  makeDamage(battler1, battler2) {
    let damage = this.calcDamage(battler1.current.move, battler2.current.move);
    battler2.current.health -= damage;
    this.logDamaging(battler1.name, damage, battler2.name);
  },
  loadCooldowns(cooldowns, moves, curMoveId) {
    for(let i = 0; i < moves.length; i++) {
      if(cooldowns[i] != moves[i].cooldown && moves[i].cooldown != 0 && i != curMoveId) {
        cooldowns[i]++;
      }
    }
  },
  calcDamage(attacking, defending) {
    let phyDmg = attacking.physicalDmg - attacking.physicalDmg * (defending.physicArmorPercents / 100);
    let magDmg = attacking.magicDmg - attacking.magicDmg * (defending.magicArmorPercents / 100);
    let damage = (phyDmg + magDmg).toFixed(1);

    return damage;
  },
  fight(player, monster) {
    monster.init();

    do {
      this.makeMove(player);
      this.makeMove(monster);
      console.log();
      this.makeDamage(player, monster);
      this.makeDamage(monster, player);
      console.log();
    } while (this.isExodus(player, monster));
  }
}



//=== START GAME LOGIC ====//

player.init();

storitellingSystem.tellBeginningStory();
battleSystem.fight(player, monster);

if(player.current.health > 0) {
  storitellingSystem.tellGoodEndStory();
} else {
  storitellingSystem.tellBadEndStory();
}
