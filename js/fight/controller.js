
var fighSong = new Audio("");

function startFight(enemy, lvl){
    is_fighting = true;
    action_type = "prepare_fight";
    loadEnemy(enemy, lvl);
    hideAllMenus();


    fighSong.currentTime = 0;
    fighSong.src = "audio/battle.ogg";
    fighSong.loop = true;
    fighSong.volume = 0.5;
    fighSong.play();
}

function loadEnemy(mob, lvl){
    enemy = new Mob(mob, lvl);
}

function endFight(am_i_alive, enemy){
    fighSong.pause();
    if(am_i_alive){
      var exp = enemy.getExp();
      var gold = enemy.getGold();

      is_lvl_up = gainExp(exp);
      gainGold(gold);

      enemy.setHealth(0);
      action_type = 0;
      cout("YOU WIN!","green");
      cout("Get " + gold + " Gold.","green"); // TODO: GOLD
      cout("Get " + exp + " EXP.","green"); // TODO: EXP
      if(is_lvl_up){
        cout("LVL Up!","green"); // TODO: EXP
      }
      cout("-----");
      is_menu_available = true;

      // mainCharacter.resetSkills(); // TODO: resetSkills();
    } else {
      var deathSound = new Audio("");
      deathSound.currentTime = 0;
      deathSound.src = "audio/death.wav";
      deathSound.volume = 1;
      deathSound.play();

      mainCharacter.setHealth(0);
      action_type = 0;
      cout("YOU LOSE!","red");
      is_menu_available = true;

      // mainCharacter.resetSkills(); // TODO: resetSkills() -> Savaş bittiğinde bekleme sürelerini sıfırla.
      // mainCharacter.dead(); // TODO: dead() -> Üzerindeki toplam gold üzerinden %10 veya %15 gold kaybeder, exp sıfırlanır. (Torchlight II Death Penalties).
    }
}


function gainExp(exp){
  var is_lvl_up = 0;

  var requiredExptoLvlUp = reqExptoLvlUp(mainCharacter.getLvl());
  var currentExp = mainCharacter.getExp() + exp;


  if(currentExp >= requiredExptoLvlUp){
    is_lvl_up = 1;
    mainCharacter.setExp(currentExp % requiredExptoLvlUp);
    mainCharacter.lvlUp();
  } else {
    mainCharacter.setExp(currentExp);
  }

  requiredExptoLvlUp = reqExptoLvlUp(mainCharacter.getLvl());

  lvlBar = mainCharacter.getExp() / requiredExptoLvlUp * 100;
  $("#container-info .bar").width("calc("+lvlBar+"% - 10px");
  $("#container-info #character-exp .info").html(mainCharacter.getLvl() + " LVL " + "<small>" + mainCharacter.getExp() + "/" + requiredExptoLvlUp + "</small>");

  return is_lvl_up;
}

function gainGold(gold){
  mainCharacter.goldUp(gold);
  $("#container-info #character-gold .info").html(mainCharacter.getGold() + " Gold");
}


function reqExptoLvlUp(lvl){
    if(lvl==1) return 100;
    else return parseInt((Math.pow(5 + lvl, 2) + reqExptoLvlUp(lvl-1) + 1) * 1.1);
}
